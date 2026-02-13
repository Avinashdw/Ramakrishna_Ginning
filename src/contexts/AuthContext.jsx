import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ADMIN_CREDENTIALS, ADMIN_USER_DATA } from '../config/admin';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if we should use mock mode (no Firebase or placeholder credentials)
    const isMock = !import.meta.env.VITE_FIREBASE_API_KEY ||
        import.meta.env.VITE_FIREBASE_API_KEY === 'your-api-key' ||
        import.meta.env.VITE_FIREBASE_API_KEY === 'AIzaSyAqNWJKqXZKXqYbGxWJXqYbGxWJXqYbGxW';

    async function login(email, password) {
        // Validate against static admin credentials
        if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
            throw new Error('Invalid admin credentials');
        }

        if (isMock) {
            // Mock mode: use localStorage
            const mockUser = { uid: ADMIN_USER_DATA.uid, email: ADMIN_USER_DATA.email };
            localStorage.setItem('currentUser', JSON.stringify(mockUser));
            localStorage.setItem(`user-${ADMIN_USER_DATA.uid}`, JSON.stringify(ADMIN_USER_DATA));
            setCurrentUser(mockUser);
            setUserData(ADMIN_USER_DATA);
            return { user: mockUser };
        }

        // Firebase mode: authenticate with Firebase
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const user = res.user;

            // Store/update admin data in Firestore
            await setDoc(doc(db, 'users', user.uid), ADMIN_USER_DATA, { merge: true });

            return res;
        } catch (error) {
            throw new Error('Authentication failed. Please check your credentials.');
        }
    }

    async function logout() {
        if (isMock) {
            localStorage.removeItem('currentUser');
            setCurrentUser(null);
            setUserData(null);
            return;
        }
        return signOut(auth);
    }

    useEffect(() => {
        if (isMock) {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                const data = JSON.parse(localStorage.getItem(`user-${user.uid}`));
                if (data && data.email === ADMIN_CREDENTIALS.email) {
                    setCurrentUser(user);
                    setUserData(data);
                } else {
                    // Invalid user, clear storage
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem(`user-${user.uid}`);
                }
            }
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user && db && db.collection) {
                try {
                    const docSnap = await getDoc(doc(db, 'users', user.uid));
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        // Verify user is admin
                        if (data.email === ADMIN_CREDENTIALS.email && data.role === 'admin') {
                            setUserData(data);
                        } else {
                            // Not admin, sign out
                            await signOut(auth);
                            setCurrentUser(null);
                            setUserData(null);
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            }
            setLoading(false);
        });

        const timeout = setTimeout(() => setLoading(false), 5000);
        return () => {
            unsubscribe();
            clearTimeout(timeout);
        };
    }, [isMock]);

    const value = {
        currentUser,
        userData,
        login,
        logout,
        isAdmin: userData?.role === 'admin'
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cotton">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Initializing Portal...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
