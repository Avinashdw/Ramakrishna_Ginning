import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Award,
    ArrowRight,
    Leaf,
    ShieldCheck,
    Factory,
    Truck,
    CheckCircle2
} from 'lucide-react';

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

const Home = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.15 } },
        viewport: { once: true }
    };

    // Generate random fibers
    const fibers = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 10
    }));

    return (
        <div className="flex flex-col bg-cotton relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {fibers.map(f => <FloatingFiber key={f.id} {...f} />)}
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-transparent z-10"></div>
                    <img
                        src="https://i.pinimg.com/736x/9a/e8/61/9ae861815d35355d0573ccf9582a62e0.jpg"
                        alt="Cotton processing"
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                </motion.div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20 md:pt-24 pb-12 md:pb-16">
                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-brass font-black text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mb-8 md:mb-10 shadow-2xl"
                        >
                            <Award size={12} className="md:w-3.5 md:h-3.5 animate-pulse" /> Global Leaders in Cotton Processing
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white leading-[0.95] mb-8 md:mb-10 text-balance tracking-tight"
                        >
                            COTTON<br />
                            <span className="text-brass italic">PROCESSING</span><br />
                            EXCELLENCE.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-sm md:text-base lg:text-xl text-cotton/60 mb-10 md:mb-14 max-w-2xl leading-relaxed font-medium text-balance"
                        >
                            Engineered for purity, Ramkrishna Cotton transforms field harvests into pristine bundles via advanced industrial ginning.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 md:gap-5"
                        >
                            <Link
                                to="/register"
                                className="brass-gradient text-forest px-8 md:px-10 lg:px-12 py-4 md:py-5 rounded-2xl font-bold text-sm md:text-base lg:text-lg shadow-brass hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 group touch-target"
                            >
                                Start Partnership <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-white/5 hover:bg-white/10 backdrop-blur-2xl text-white border border-white/20 px-8 md:px-10 lg:px-12 py-4 md:py-5 rounded-2xl font-bold text-sm md:text-base lg:text-lg transition-all text-center hover:border-white/40 touch-target"
                            >
                                Contact Sales
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, rotate: 10 }}
                    animate={{ opacity: 0.03, rotate: -5 }}
                    transition={{ delay: 1, duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-0 right-0 p-20 select-none hidden xl:block pointer-events-none"
                >
                    <Leaf size={700} className="text-white" />
                </motion.div>
            </section>

            {/* Stats Bar */}
            <div className="bg-white/80 backdrop-blur-3xl border-y border-gray-100 py-10 md:py-12 lg:py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
                        {[
                            { label: 'Annual Production', val: '500k+', unit: 'Bales' },
                            { label: 'Farmer Network', val: '5,000+', unit: 'Partners' },
                            { label: 'Quality Rating', val: '99.9', unit: '%' },
                            { label: 'Global Export', val: '12', unit: 'Countries' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="text-center md:text-left group"
                            >
                                <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-forest flex flex-col md:flex-row items-center md:items-baseline justify-center md:justify-start gap-1 group-hover:text-brass transition-colors">
                                    <span>{stat.val}</span><span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase">{stat.unit}</span>
                                </div>
                                <div className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16 md:py-24 lg:py-40 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-16 md:mb-20 lg:mb-24 max-w-4xl mx-auto">
                        <span className="text-brass font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6 block">The Advantage</span>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-forest mb-6 md:mb-8 leading-tight tracking-tight">
                            Engineered Ginning Excellence
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                            Our proprietary ginning process protects fiber integrity while delivering surgical-grade purity.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12"
                    >
                        {[
                            { icon: ShieldCheck, title: "Ginning Unit", desc: "Isolating pure cotton lint with zero contamination via high-speed saw technology." },
                            { icon: Factory, title: "Pressing Unit", desc: "Automated hydraulic units transforming lint into high-density international standard bundles." },
                            { icon: Truck, title: "Cleaning Line", desc: "Industrial-scale wad-busters eliminate field debris before the extraction phase." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    initial: { opacity: 0, y: 40 },
                                    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="p-8 md:p-10 lg:p-14 rounded-[32px] md:rounded-[48px] bg-cotton border border-gray-100 hover:border-brass/30 hover:shadow-premium transition-all duration-700 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 md:p-10 opacity-5 group-hover:scale-110 transition-transform hidden md:block">
                                    <item.icon size={100} className="md:w-[120px] md:h-[120px]" />
                                </div>
                                <div className="w-14 h-14 md:w-16 md:h-16 forest-gradient rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-6 md:mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <item.icon size={20} className="md:w-6 md:h-6" />
                                </div>
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-forest mb-3 md:mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium text-sm md:text-base">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Industrial Showcase */}
            <section className="py-20 md:py-32 lg:py-48 bg-forest overflow-hidden relative">
                <div className="absolute inset-0 z-0 opacity-[0.03] select-none pointer-events-none">
                    <div className="absolute top-0 left-0 text-[20vw] font-black rotate-12 leading-none">PRISTINE</div>
                    <div className="absolute bottom-0 right-0 text-[20vw] font-black -rotate-12 leading-none">FIBER</div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 text-center lg:text-left"
                        >
                            <span className="text-brass/60 font-bold uppercase tracking-widest text-xs mb-8 block">Our Legacy</span>
                            <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-10 leading-tight tracking-tight">
                                Empower <br className="hidden md:block" />
                                <span className="text-brass italic">Farmers</span>
                            </h2>
                            <p className="text-cotton/60 text-base md:text-lg mb-14 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                                Supporting 5,000+ local partners with technical precision and transparent industrial standards.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto lg:mx-0">
                                {[
                                    { icon: CheckCircle2, text: "Industrial Cleaning" },
                                    { icon: CheckCircle2, text: "Seed Separation" },
                                    { icon: CheckCircle2, text: "Bundle Pressing" },
                                    { icon: CheckCircle2, text: "B2B Logistics" }
                                ].map((li, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                                        <li.icon className="text-brass" size={16} />
                                        {li.text}
                                    </div>
                                ))}
                            </div>

                            <Link to="/about" className="group inline-flex items-center gap-4 text-brass font-bold uppercase tracking-widest text-xs hover:translate-x-2 transition-all">
                                Historical Ledger <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-1 relative w-full"
                        >
                            <div className="relative z-10 rounded-[60px] md:rounded-[80px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-8 border-white/5">
                                <img src="https://images.unsplash.com/photo-1594145070006-259160da308b?q=80&w=2070&auto=format&fit=crop" alt="Cotton processing" className="w-full h-auto scale-110 hover:scale-100 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent"></div>
                            </div>
                            <div className="absolute -top-20 -right-20 w-[120%] h-[120%] bg-brass/10 rounded-full blur-[120px] -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32 lg:py-48 bg-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-cotton rounded-[40px] md:rounded-[60px] lg:rounded-[100px] p-8 md:p-16 lg:p-32 text-center shadow-premium relative overflow-hidden border border-gray-100"
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-grain opacity-5 pointer-events-none"></div>
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brass/5 rounded-full blur-3xl"></div>
                        <h2 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-forest mb-6 md:mb-8 lg:mb-10 relative z-10 tracking-tight leading-tight">Elevate Your Fiber <br /> <span className="text-brass italic">Standards.</span></h2>
                        <p className="text-gray-500 text-sm md:text-base lg:text-xl mb-10 md:mb-12 lg:mb-16 relative z-10 max-w-2xl mx-auto font-medium leading-relaxed">
                            Join the global network of fabric manufacturers sourcing premium RamaKrishna cotton.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5 relative z-10">
                            <Link
                                to="/register"
                                className="forest-gradient text-white px-8 md:px-10 lg:px-12 py-4 md:py-5 rounded-2xl font-bold text-sm md:text-base lg:text-lg shadow-2xl hover:scale-105 hover:shadow-forest/20 active:scale-95 transition-all uppercase tracking-widest touch-target"
                            >
                                Secure Access
                            </Link>
                            <Link
                                to="/services"
                                className="bg-white border-2 border-forest/5 text-forest px-8 md:px-10 lg:px-12 py-4 md:py-5 rounded-2xl font-bold text-sm md:text-base lg:text-lg hover:bg-forest hover:text-white transition-all uppercase tracking-widest touch-target"
                            >
                                Inspect Units
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
