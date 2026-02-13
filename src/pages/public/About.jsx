import React from 'react';
import { Target, Users, Landmark, History, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className="bg-cotton min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 lg:py-40 border-b border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-forest/5 -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-brass font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-4 md:mb-6 block">Our Legacy</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-forest mb-6 md:mb-8 leading-[0.9] text-balance">
                            Industrial <span className="text-brass italic">Legacy.</span>
                        </h1>
                        <p className="text-sm md:text-base lg:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed text-balance">
                            Since 2004, Ramkrishna Cotton has been at the forefront of the Indian cotton industry, perfecting the automatic journey from field to bale.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, rotate: 20 }}
                    animate={{ opacity: 0.03, rotate: 0 }}
                    transition={{ duration: 2 }}
                    className="absolute -right-10 md:-right-20 top-0 text-[10rem] md:text-[15rem] lg:text-[30rem] font-black text-forest/20 select-none pointer-events-none"
                >
                    RN
                </motion.div>
            </section>

            {/* Core Pillars */}
            <section className="py-16 md:py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
                        <motion.div {...fadeIn}>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-forest mb-5 md:mb-6 lg:mb-8 leading-tight text-balance">From Field to Fabric: A Journey of Purity.</h2>
                            <p className="text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 lg:mb-10 font-medium text-balance">
                                At Ramkrishna Cotton, our process is defined by strict industrial protocols: thorough cleaning of raw cotton, precision seed removal, and the extraction of 100% pure cotton lint.
                            </p>
                            <div className="space-y-4 md:space-y-5 lg:space-y-6">
                                {[
                                    { title: "Sustainable Sourcing", text: "Direct partnerships with farmers ensuring fair trade and ethics." },
                                    { title: "Industrial Excellence", text: "ISO-certified processes that exceed global quality benchmarks." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 md:gap-4 p-4 md:p-5 lg:p-6 bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm">
                                        <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 brass-gradient rounded-xl flex items-center justify-center text-forest">
                                            <CheckCircle2 size={18} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-forest text-sm md:text-base mb-1">{item.title}</h4>
                                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative px-4 md:px-0"
                        >
                            <div className="rounded-[32px] md:rounded-[40px] overflow-hidden shadow-premium aspect-[4/5] relative">
                                <img src="https://images.unsplash.com/photo-1594903525042-83b6b194fb8e?q=80&w=2070&auto=format&fit=crop" alt="Founder" className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-forest/10"></div>
                            </div>
                            <div className="absolute -bottom-4 md:-bottom-6 lg:-bottom-10 -left-2 md:-left-6 lg:-left-10 bg-white p-5 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-premium border border-gray-100 max-w-[180px] md:max-w-[220px] lg:max-w-xs">
                                <span className="text-brass font-black text-2xl md:text-3xl lg:text-4xl block mb-1 md:mb-2">20+</span>
                                <p className="text-[9px] md:text-[10px] lg:text-xs uppercase font-black text-forest tracking-widest leading-loose">Years of Uninterrupted Quality Production</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24 lg:py-32 bg-forest relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div {...fadeIn} className="mb-12 md:mb-16 lg:mb-24">
                        <span className="text-brass font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-3 md:mb-4 block">Leadership</span>
                        <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-tight">Trust is Built with Expertise</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
                        {[
                            { name: "Founder Name", role: "Managing Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
                            { name: "Krishna Tellawar", role: "Operations Head", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" }
                        ].map((person, i) => (
                            <motion.div
                                key={i}
                                {...fadeIn}
                                transition={{ delay: i * 0.2 }}
                                className="group bg-white/5 border border-white/10 p-6 md:p-8 lg:p-10 rounded-[32px] md:rounded-[40px] hover:bg-white transition-all duration-500"
                            >
                                <div className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full mx-auto mb-5 md:mb-6 lg:mb-8 overflow-hidden border-4 border-brass/20 grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={person.img} alt={person.name} className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <h4 className="text-lg md:text-xl lg:text-2xl font-black text-white group-hover:text-forest transition-colors mb-2">{person.name}</h4>
                                <p className="text-brass font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">{person.role}</p>
                                <p className="text-cotton/40 group-hover:text-gray-500 text-xs md:text-sm leading-relaxed max-w-sm mx-auto">Dedicated to the vision of providing world-class cotton and empowering the local farming community.</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
