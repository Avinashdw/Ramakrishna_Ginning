import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    User,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Home,
    Leaf,
    Bell
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Inquiries', path: '/admin/dashboard/inquiries', icon: MessageSquare },
        { name: 'Services', path: '/admin/dashboard/services', icon: Settings },
        { name: 'Gallery', path: '/admin/dashboard/gallery', icon: Settings },
        { name: 'Users', path: '/admin/dashboard/users', icon: User },
    ];

    return (
        <div className="min-h-screen bg-cotton flex overflow-hidden">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 100 }}
                className="bg-forest border-r border-white/5 fixed h-full z-30 shadow-2xl"
            >
                <div className="flex flex-col h-full">
                    <div className="h-24 flex items-center px-8 border-b border-white/5">
                        <Link to="/" className="flex items-center gap-4">
                            <div className="w-12 h-12 brass-gradient rounded-xl flex items-center justify-center text-forest font-black shrink-0 shadow-lg">RK</div>
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="font-black text-cotton uppercase tracking-widest text-sm"
                                    >
                                        Control <span className="text-brass">Center</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Link>
                    </div>

                    <nav className="flex-grow py-10 px-6 space-y-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${isActive
                                        ? 'bg-brass text-forest shadow-lg shadow-brass/20'
                                        : 'text-cotton/40 hover:bg-white/5 hover:text-cotton'
                                        }`}
                                >
                                    <Icon size={22} className={isActive ? 'text-forest' : 'group-hover:text-brass transition-colors'} />
                                    {isSidebarOpen && <span className="font-bold tracking-tight">{item.name}</span>}
                                    {isActive && isSidebarOpen && <ChevronRight size={16} className="ml-auto opacity-50" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-6 border-t border-white/5">
                        <button
                            onClick={handleLogout}
                            className={`flex items-center gap-4 w-full px-4 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all group`}
                        >
                            <LogOut size={22} />
                            {isSidebarOpen && <span className="font-bold">Terminate Session</span>}
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-[280px]' : 'ml-[100px]'} flex flex-col h-screen`}>
                <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-20">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl text-gray-400" title="Public View">
                                <Home size={20} />
                            </Link>
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl text-gray-400 relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-brass rounded-full"></span>
                            </button>
                        </div>

                        <div className="h-10 w-px bg-gray-100"></div>

                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-forest">{userData?.name}</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black leading-none">{userData?.role}</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl forest-gradient flex items-center justify-center text-cotton font-black shadow-lg border-4 border-white">
                                {userData?.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-grow p-10 overflow-y-auto custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
