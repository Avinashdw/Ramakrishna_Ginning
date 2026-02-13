import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { LayoutDashboard, Users, MessageSquare, Briefcase, Image as ImageIcon, ArrowUpRight, ShieldCheck, Factory, TrendingUp, Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { userData } = useAuth();

    const stats = [
        { label: 'Active Gingers', value: '1,284', icon: Users, color: 'text-forest', bg: 'bg-cotton' },
        { label: 'Pending Baling', value: '45', icon: MessageSquare, color: 'text-forest', bg: 'bg-cotton' },
        { label: 'Pressing Units', value: '12', icon: Briefcase, color: 'text-forest', bg: 'bg-cotton' },
        { label: 'Yield Archives', value: '86', icon: ImageIcon, color: 'text-forest', bg: 'bg-cotton' },
    ];

    const [rate, setRate] = useState('');
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Check if we should use mock mode (same logic as AuthContext)
    const isMock = !import.meta.env.VITE_FIREBASE_API_KEY ||
        import.meta.env.VITE_FIREBASE_API_KEY === 'your-api-key' ||
        import.meta.env.VITE_FIREBASE_API_KEY === 'AIzaSyAqNWJKqXZKXqYbGxWJXqYbGxWJXqYbGxW';

    useEffect(() => {
        const fetchRate = async () => {
            if (isMock) {
                const savedRate = localStorage.getItem('cotton_rate');
                if (savedRate) {
                    setRate(JSON.parse(savedRate).price);
                }
                return;
            }

            if (!db || !db.collection) return;
            try {
                const docRef = doc(db, "settings", "cotton_rate");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRate(docSnap.data().price);
                }
            } catch (e) { console.error(e); }
        };
        fetchRate();
    }, [isMock]);

    const handleUpdateRate = async () => {
        if (!rate) return;
        setUpdating(true);
        setMessage({ type: '', text: '' });

        try {
            if (isMock) {
                const newRate = {
                    price: rate,
                    updatedAt: new Date().toISOString(),
                    updatedBy: userData?.name || 'Admin'
                };
                localStorage.setItem('cotton_rate', JSON.stringify(newRate));
                setMessage({ type: 'success', text: 'Rate updated locally!' });
            } else {
                if (!db || !db.collection) throw new Error('Database not initialized');
                await setDoc(doc(db, "settings", "cotton_rate"), {
                    price: rate,
                    updatedAt: new Date().toISOString(),
                    updatedBy: userData?.name || 'Admin'
                }, { merge: true });
                setMessage({ type: 'success', text: 'Rate updated successfully!' });
            }
        } catch (error) {
            console.error("Error updating rate:", error);
            setMessage({ type: 'error', text: 'Failed to update rate.' });
        } finally {
            setUpdating(false);
        }
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="space-y-8 md:space-y-12 pb-20">
            <motion.div
                {...fadeIn}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-sm border border-gray-100 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5">
                    <Factory size={80} md:size={120} />
                </div>
                <div className="relative z-10 w-full md:w-auto">
                    <h1 className="text-2xl md:text-4xl font-black text-forest leading-tight md:leading-none mb-2 break-words">Systems Online, <br className="md:hidden" /> {userData?.name}</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Administrative Command • Real-time Monitoring</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-premium border border-gray-50 flex items-center gap-4 md:gap-5 group hover:border-brass/20 transition-all duration-500"
                    >
                        <div className={`w-12 h-12 md:w-16 md:h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brass transition-colors duration-500`}>
                            <stat.icon size={20} md:size={28} />
                        </div>
                        <div>
                            <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-xl md:text-3xl font-black text-forest">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    {...fadeIn}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-premium border border-gray-50"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 md:h-8 bg-brass rounded-full"></div>
                            <h2 className="text-xl md:text-2xl font-black text-forest uppercase tracking-tight">Recent Protocols</h2>
                        </div>
                        <button className="text-brass font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                            Audit Dashboard <ArrowUpRight size={14} md:size={16} />
                        </button>
                    </div>
                    <div className="space-y-6 md:space-y-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex gap-4 md:gap-6 pb-6 md:pb-8 border-b border-gray-50 last:border-0 last:pb-0 group">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-cotton flex items-center justify-center text-forest/20 group-hover:bg-brass group-hover:text-forest transition-colors shrink-0">
                                    <ShieldCheck size={20} md:size={24} />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-forest font-bold leading-tight md:leading-none mb-1 md:mb-2 text-sm md:text-base">New requisition authenticated from <span className="text-brass">Partner Alpha-{i}</span></p>
                                    <p className="text-[9px] md:text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">2 hours ago • Precision Ginning</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    {...fadeIn}
                    transition={{ delay: 0.5 }}
                    className="forest-gradient text-cotton p-8 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden relative group"
                >
                    <div className="relative z-10">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-brass/20 transition-all duration-500">
                            <TrendingUp size={28} md:size={32} className="text-brass" />
                        </div>
                        <h3 className="text-xl md:text-3xl font-black mb-3 md:mb-4">Cotton Rate</h3>
                        <p className="text-cotton/60 font-medium mb-8 md:mb-10 leading-relaxed text-xs md:text-sm">Update the global cotton market index shown to all users instantly.</p>

                        <div className="space-y-4 mb-8 md:mb-10">
                            <div className="relative group/input">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-brass font-black text-xl group-focus-within/input:scale-110 transition-transform">₹</span>
                                <input
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="w-full bg-forest-light/30 border border-white/10 rounded-2xl py-4 md:py-5 pl-12 pr-6 text-white font-black text-xl md:text-2xl focus:ring-2 focus:ring-brass/50 outline-none transition-all placeholder:text-white/10"
                                    placeholder="0000"
                                />
                            </div>
                            {message.text && (
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                                >
                                    {message.text}
                                </motion.p>
                            )}
                        </div>

                        <button
                            onClick={handleUpdateRate}
                            disabled={updating}
                            className="w-full bg-brass text-forest px-6 py-4 md:px-8 md:py-5 rounded-2xl font-black shadow-brass hover:scale-[1.02] active:scale-95 transition-all text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {updating ? <Loader2 className="animate-spin" size={16} md:size={18} /> : <Save size={16} md:size={18} />}
                            {updating ? 'Processing...' : 'Sync Market Rate'}
                        </button>
                    </div>
                    <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                        <TrendingUp size={180} md:size={280} />
                    </div>
                </motion.div>

                <motion.div
                    {...fadeIn}
                    transition={{ delay: 0.6 }}
                    className="bg-white p-8 md:p-12 rounded-[32px] md:rounded-[40px] shadow-premium border border-gray-50 overflow-hidden relative group"
                >
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-black text-forest mb-4">Core Support</h3>
                        <p className="text-gray-500 font-medium mb-8 md:mb-10 leading-relaxed text-sm md:text-base">Require high-level override or system assistance? Our technical directors are on standby.</p>
                        <button className="bg-forest text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all text-xs md:text-sm uppercase tracking-widest">
                            Global Sync
                        </button>
                    </div>
                    <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 opacity-5 group-hover:scale-110 transition-transform">
                        <LayoutDashboard size={180} md:size={280} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
