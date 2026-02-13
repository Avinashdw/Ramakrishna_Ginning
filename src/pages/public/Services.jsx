import React from 'react';
import { Box, Droplets, Zap, Microscope, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
    const services = [
        {
            stage: 1,
            title: 'Raw Cotton Cleaning',
            desc: 'Multi-stage cleaning system equipped with Wad Busters to ensure raw cotton is contaminant-free before processing.',
            icon: Droplets,
            features: ['Debris Removal', 'Dust Extraction', 'Foreign Matter Separation']
        },
        {
            stage: 2,
            title: 'Seed Separation',
            desc: 'Precision saw-ginning process designed for the high-speed isolation of pure cotton fibers from seeds.',
            icon: Box,
            features: ['Automated Ginning', 'Fiber Preservation', 'Seed Recovery']
        },
        {
            stage: 3,
            title: 'Pure Cotton Extraction',
            desc: 'Advanced extraction unit that ensures only the highest quality cotton fibers proceed to the next stage.',
            icon: Microscope,
            features: ['Quality Sorting', 'Fiber Grading', 'Purity Testing']
        },
        {
            stage: 4,
            title: 'Hydraulic Pressing',
            desc: 'Advanced baling station that compresses pure cotton into standardized industrial bundles for transport.',
            icon: Zap,
            features: ['High-Pressure Compression', 'Standard Bale Sizing', 'Automated Wrapping']
        },
        {
            stage: 5,
            title: 'B2B Distribution',
            desc: 'Direct supply chain to fabric manufacturers with quality certification and logistics management.',
            icon: ShoppingBag,
            features: ['Quality Certification', 'Bulk Orders', 'Timely Delivery']
        }
    ];

    const fadeIn = {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className="bg-cotton min-h-screen">
            {/* Hero Section */}
            <section className="bg-forest py-20 md:py-32 lg:py-40 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute bottom-0 left-0 p-10 md:p-20 select-none">
                        <Box size={200} className="md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px]" />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-brass font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-4 md:mb-6 block">Industrial Processing</span>
                        <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-none text-balance">
                            Five-Stage <br />
                            <span className="text-brass italic">Precision.</span>
                        </h1>
                        <p className="text-sm md:text-base lg:text-xl text-cotton/60 max-w-2xl mx-auto font-medium text-balance leading-relaxed">
                            From raw cotton to export-ready bales, our automated process ensures unmatched purity and quality at every step.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 md:py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                {...fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white p-6 md:p-8 lg:p-10 rounded-[32px] md:rounded-[40px] lg:rounded-[48px] border border-gray-100 shadow-premium hover:shadow-brass transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="flex items-start gap-4 md:gap-5 lg:gap-6 mb-5 md:mb-6 lg:mb-8">
                                    <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 forest-gradient rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                                        <service.icon size={22} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-brass font-black text-xs md:text-sm uppercase tracking-widest block mb-1 md:mb-2">Stage {service.stage}</span>
                                        <h3 className="text-lg md:text-xl lg:text-2xl font-black text-forest leading-tight">{service.title}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-5 md:mb-6 lg:mb-8 font-medium">{service.desc}</p>
                                <div className="space-y-2 md:space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-forest font-bold">
                                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-brass rounded-full shrink-0"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
