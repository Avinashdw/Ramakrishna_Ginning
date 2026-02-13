import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Loader2, AlertCircle, Leaf, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingFiber = ({ delay = 0, x, y, size }) => (
    <motion.div
        initial={{ opacity: 0, y: 0, x: 0 }}
        animate={{
            opacity: [0, 0.4, 0],
            y: [0, -100 - Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360]
        }}
        transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
        style={{ left: x, top: y }}
        className="absolute pointer-events-none z-0"
    >
        <div className="bg-brass/10 blur-[2px] rounded-full" style={{ width: size, height: size }}></div>
    </motion.div>
);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const fibers = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 10
    }));

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/admin/dashboard', { replace: true });
        } catch (err) {
            setError('Invalid admin credentials. Please check your email and password.');
            console.error(err);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 md:py-32 bg-cotton relative overflow-hidden">
            {fibers.map(f => <FloatingFiber key={f.id} {...f} />)}
            <div className="absolute inset-0 bg-forest/5 -z-10"></div>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md w-full relative z-10"
            >
                <div className="glass-card rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/40 shadow-2xl">
                    <div className="forest-gradient p-10 md:p-14 text-center relative overflow-hidden">
                        <motion.div
                            animate={{ rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute -top-10 -right-10 p-4 opacity-10 text-white"
                        >
                            <Leaf size={180} />
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12, delay: 0.3 }}
                            className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-2xl rounded-[20px] md:rounded-[28px] flex items-center justify-center text-white mx-auto mb-6 md:mb-8 shadow-2xl border border-white/20"
                        >
                            <Lock size={28} className="md:w-8 md:h-8 text-brass" />
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2 md:mb-3 tracking-tighter uppercase">Admin Portal</h2>
                        <p className="text-cotton/40 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em]">Ramkrishna Ginning & Pressing</p>
                    </div>

                    <div className="p-8 md:p-12 lg:p-14">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-6 md:mb-8 bg-red-500/10 border border-red-500/20 text-red-600 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3"
                            >
                                <AlertCircle size={16} className="md:w-[18px] md:h-[18px] shrink-0" />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{error}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                            <div className="space-y-2 md:space-y-3">
                                <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Admin Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brass transition-colors" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Admin@ramakrishna.com"
                                        className="w-full pl-14 md:pl-16 pr-6 md:pr-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-cotton/50 border border-gray-100 focus:bg-white focus:border-brass/40 focus:ring-4 md:focus:ring-8 focus:ring-brass/5 transition-all font-bold text-sm md:text-base text-forest placeholder:text-gray-300 outline-none touch-target"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:space-y-3">
                                <label className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Admin Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brass transition-colors" size={16} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-14 md:pl-16 pr-6 md:pr-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-cotton/50 border border-gray-100 focus:bg-white focus:border-brass/40 focus:ring-4 md:focus:ring-8 focus:ring-brass/5 transition-all font-bold text-sm md:text-base text-forest placeholder:text-gray-300 outline-none touch-target"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full forest-gradient text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest shadow-2xl hover:shadow-brass/20 transition-all flex items-center justify-center gap-3 md:gap-4 active:scale-[0.98] disabled:opacity-70 group touch-target"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : (
                                    <>Access Dashboard <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-2 transition-transform" /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-100 text-center">
                            <p className="text-gray-400 font-bold text-[9px] md:text-xs uppercase tracking-widest">
                                Authorized Personnel Only
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
