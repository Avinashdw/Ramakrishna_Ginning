import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Menu, X, Leaf, Github, Phone, Mail, MapPin, Instagram, Linkedin, Facebook, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const CottonRateBar = () => {
    const [rate, setRate] = useState({ price: '---', trend: 'stable' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isMock = !import.meta.env.VITE_FIREBASE_API_KEY ||
            import.meta.env.VITE_FIREBASE_API_KEY === 'your-api-key' ||
            import.meta.env.VITE_FIREBASE_API_KEY === 'AIzaSyAqNWJKqXZKXqYbGxWJXqYbGxWJXqYbGxW';

        if (isMock) {
            const fetchMockRate = () => {
                const savedRate = localStorage.getItem('cotton_rate');
                if (savedRate) {
                    setRate(JSON.parse(savedRate));
                } else {
                    // Initial mock value
                    const initialRate = { price: '8,450', trend: 'up' };
                    setRate(initialRate);
                    localStorage.setItem('cotton_rate', JSON.stringify(initialRate));
                }
                setLoading(false);
            };

            fetchMockRate();
            // Listen for local storage changes (from Admin Dashboard in other tabs/same logic)
            const handleStorage = (e) => {
                if (e.key === 'cotton_rate') {
                    setRate(JSON.parse(e.newValue));
                }
            };
            window.addEventListener('storage', handleStorage);

            // Polling for same-tab updates
            const interval = setInterval(fetchMockRate, 1000);

            return () => {
                window.removeEventListener('storage', handleStorage);
                clearInterval(interval);
            };
        }

        if (!db || !db.collection) return;
        const unsub = onSnapshot(doc(db, "settings", "cotton_rate"), (doc) => {
            if (doc.exists()) {
                setRate(doc.data());
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    return (
        <div className="bg-forest border-b border-white/10 py-2 md:py-2.5 overflow-hidden relative z-[60]">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em]">
                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    <span className="text-brass/60 hidden sm:inline">Market Index</span>
                    <div className="flex items-center gap-1.5 md:gap-2 text-white">
                        <TrendingUp size={12} className="text-brass animate-pulse shrink-0" />
                        <span className="whitespace-nowrap text-[9px] md:text-[10px]">Today's Cotton Rate: <span className="text-brass ml-1">₹{rate.price}/Quintal</span></span>
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-6 text-white/40 text-[9px]">
                    <span className="hover:text-brass/60 transition-colors">Precision Ginning</span>
                    <span className="w-1 h-1 bg-brass/30 rounded-full"></span>
                    <span className="hover:text-brass/60 transition-colors">Global Export Quality</span>
                </div>
            </div>
            <motion.div
                animate={{ x: [-1000, 1000] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-brass/5 to-transparent pointer-events-none"
            />
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Quality', path: '/quality' },
        { name: 'Contact', path: '/contact' },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-premium py-2 top-0' : 'bg-transparent py-4 md:py-6 top-[32px] md:top-[38px]'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
                            <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 forest-gradient rounded-xl flex items-center justify-center text-white shadow-brass rotate-3 group-hover:rotate-0 transition-all duration-500">
                                <Leaf size={20} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-base md:text-lg lg:text-xl font-black tracking-tighter ${scrolled ? 'text-forest' : 'text-forest'} leading-none`}>RAMKRISHNA</span>
                                <span className="text-[9px] md:text-[10px] font-bold text-brass uppercase tracking-[0.15em] md:tracking-[0.2em] mt-0.5">Cotton Ginning</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-4 py-2 rounded-xl text-xs lg:text-sm font-black uppercase tracking-widest transition-all duration-300 ${location.pathname === link.path
                                    ? 'text-forest bg-forest/5'
                                    : 'text-gray-600 hover:text-forest hover:bg-forest/5'}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="ml-4 pl-4 border-l border-gray-100 flex items-center gap-3">
                            {userData ? (
                                <>
                                    <Link
                                        to="/admin/dashboard"
                                        className="forest-gradient text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-premium hover:shadow-brass transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Admin Portal
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2.5 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-xl transition-all"
                                        title="Logout"
                                    >
                                        <X size={18} />
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="forest-gradient text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-premium hover:shadow-brass transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Admin Login
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-3 rounded-xl transition-all bg-forest/5 text-forest touch-target"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-gray-100 overflow-hidden shadow-2xl fixed inset-x-0 top-[72px] md:top-[120px] bottom-0 z-40"
                    >
                        <div className="px-6 py-8 space-y-5 flex flex-col h-full overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-2xl md:text-3xl font-black tracking-tighter ${location.pathname === link.path ? 'text-forest' : 'text-gray-300'} transition-colors py-2 touch-target`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-8 mt-auto border-t border-gray-100 flex flex-col gap-3">
                                {userData ? (
                                    <Link
                                        to="/admin/dashboard"
                                        className="forest-gradient text-white text-center py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg touch-target"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="w-full text-center forest-gradient text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg touch-target"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Admin Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-forest text-cotton/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 lg:gap-24">
                    <div className="col-span-1 md:col-span-1 md:border-r border-white/5 md:pr-8">
                        <Link to="/" className="flex items-center gap-3 mb-6 md:mb-8 justify-center md:justify-start">
                            <div className="w-10 h-10 brass-gradient rounded-lg flex items-center justify-center text-forest">
                                <Leaf size={20} />
                            </div>
                            <span className="text-xl font-black text-white tracking-tighter">RAMKRISHNA</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 md:mb-8 opacity-60 text-center md:text-left">
                            Setting the global standard for premium cotton fiber since 2004. Quality, integrity, and innovation in every bale.
                        </p>
                        <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
                            {[Facebook, Instagram, Linkedin, Github].map((Icon, idx) => (
                                <a key={idx} href="#" className="p-2.5 md:p-2 bg-white/5 rounded-lg hover:bg-brass hover:text-forest transition-all duration-300 touch-target" aria-label={`Social link ${idx + 1}`}>
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-white font-bold mb-6 md:mb-8 text-sm uppercase tracking-widest">Navigation</h4>
                        <ul className="space-y-3 md:space-y-4 font-medium text-sm">
                            <li><Link to="/about" className="hover:text-brass transition-colors inline-block py-1">About Story</Link></li>
                            <li><Link to="/services" className="hover:text-brass transition-colors inline-block py-1">Core Services</Link></li>
                            <li><Link to="/quality" className="hover:text-brass transition-colors inline-block py-1">Quality Control</Link></li>
                            <li><Link to="/contact" className="hover:text-brass transition-colors inline-block py-1">Global Network</Link></li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-white font-bold mb-6 md:mb-8 text-sm uppercase tracking-widest">Global Support</h4>
                        <ul className="space-y-5 md:space-y-6 text-sm">
                            <li className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-3">
                                <MapPin className="text-brass shrink-0" size={18} />
                                <span className="text-center md:text-left">Ramkrishna Campus, MS-Highway 12, Maharashtra, IN</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-3">
                                <Phone className="text-brass shrink-0" size={18} />
                                <span>+91 7875746795</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-3">
                                <Mail className="text-brass shrink-0" size={18} />
                                <span className="break-all">krishnatellawar999@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-forest-light p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5">
                        <h4 className="text-white font-bold mb-3 md:mb-4 text-sm uppercase tracking-widest">Newsletter</h4>
                        <p className="text-xs mb-5 md:mb-6 opacity-60">Get industry insights and company updates.</p>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Email" className="bg-forest border-none rounded-xl px-4 py-3 md:py-2 w-full text-sm focus:ring-1 focus:ring-brass" />
                            <button className="p-3 md:p-2 bg-brass text-forest rounded-xl touch-target" aria-label="Subscribe"><ArrowRight size={18} /></button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
                    <p>&copy; {new Date().getFullYear()} RAMKRISHNA COTTON CORP. PRISTINE FIBER DIVISION.</p>
                    <div className="flex gap-10">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const MainLayout = () => {
    const location = useLocation();

    // Auto-scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="page-outer transition-colors duration-700">
            <header className="fixed top-0 left-0 right-0 z-50">
                <CottonRateBar />
            </header>
            <Navbar />
            <main className="flex-grow pt-[100px] md:pt-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
