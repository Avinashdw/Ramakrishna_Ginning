import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Maximize2, Factory, Leaf } from 'lucide-react';

const Gallery = () => {
    const images = [
        { src: 'https://images.unsplash.com/photo-1594145070006-259160da308b?q=80&w=2070&auto=format&fit=crop', title: 'Phase 1: Automated Ginning' },
        { src: 'https://images.unsplash.com/photo-1594903525042-83b6b194fb8e?q=80&w=2070&auto=format&fit=crop', title: 'Quality Assessment Center' },
        { src: 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop', title: 'High-Density Pressing' },
        { src: 'https://images.unsplash.com/photo-1579154273811-0a4472093e96?q=80&w=2070&auto=format&fit=crop', title: 'Precision Molecular Lab' },
        { src: 'https://images.unsplash.com/photo-1523301343968-6a6ebf62c674?q=80&w=2070&auto=format&fit=crop', title: 'Seed Processing Division' },
        { src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop', title: 'Global Logistics Hub' }
    ];

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className="bg-cotton min-h-screen">
            {/* Header */}
            <section className="bg-forest py-20 md:py-32 lg:py-40 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-0 right-0 p-10 md:p-20 select-none">
                        <Leaf size={200} className="md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px]" />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-brass font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-4 md:mb-6 block">Visual Documentation</span>
                        <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-none uppercase text-balance">
                            Industrial <span className="text-brass italic">Legacy.</span>
                        </h1>
                        <p className="text-sm md:text-base lg:text-xl text-cotton/60 max-w-2xl mx-auto font-medium text-balance leading-relaxed">
                            A visual chronicle of our technological evolution and commitment to pristine fiber production.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 md:py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                        {images.map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="group relative aspect-[4/5] rounded-[32px] md:rounded-[40px] lg:rounded-[48px] overflow-hidden shadow-premium bg-white border border-gray-100"
                            >
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                                    <h3 className="text-white text-base md:text-lg lg:text-xl font-black mb-2 md:mb-3 lg:mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-brass text-[9px] md:text-[10px] font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                        <Maximize2 size={12} className="md:w-3.5 md:h-3.5" /> Full Resolution Protocol
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <ImageIcon size={16} className="md:w-5 md:h-5" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industrial Overlay */}
            <div className="py-10 md:py-16 lg:py-20 bg-white text-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 opacity-5 select-none pointer-events-none">
                    <div className="text-[12vw] md:text-[15vw] font-black text-forest leading-none">PRISTINE</div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
