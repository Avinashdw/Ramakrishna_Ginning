import React from 'react';
import { CheckCircle, ShieldCheck, Search, FileText, Settings, Award, Microscope, Droplets, Target, Factory } from 'lucide-react';
import { motion } from 'framer-motion';

const Quality = () => {
    const qualityPoints = [
        {
            title: 'HVI Precision Testing',
            desc: 'Every bale is calibrated via High Volume Instrument testing for saw ginning output uniformity.',
            icon: ShieldCheck
        },
        {
            title: 'Micronaire Analysis',
            desc: 'Scientific fineness and maturity testing to ensure consistent yarn spinning performance.',
            icon: Microscope
        },
        {
            title: 'Trash Clearance %',
            desc: 'Multi-stage cleaning ensures residue-free lint, meeting the most stringent export standards.',
            icon: Search
        },
        {
            title: 'Moisture Equilibrium',
            desc: 'Controlled conditioning to maintain quality and prevent processing breakage.',
            icon: Droplets
        }
    ];

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className="bg-cotton min-h-screen">
            {/* Header */}
            <section className="relative py-40 overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 bg-forest/5 -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-brass font-black uppercase tracking-[0.3em] text-xs mb-6 block">Certification & Standards</span>
                        <h1 className="text-6xl md:text-8xl font-black text-forest mb-8 leading-none">
                            Process <br />
                            <span className="text-brass italic">Control.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl font-medium leading-relaxed">
                            Quality at Ramkrishna is a constant process of calibration. We monitor every stage—from cleaning to pressing—to ensure absolute consistency.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Industrial Protocols */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                        <motion.div {...fadeIn}>
                            <h2 className="text-4xl md:text-5xl font-black text-forest mb-8">The Gold Standard of Micro-Cleaning.</h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-12 font-medium">
                                We utilize a closed-loop processing system that virtually eliminates external contamination. Our HVI-backed laboratory ensures that the cotton delivered to your mill is exactly what was promised.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { icon: Target, title: "Precision", text: "99.9% Trash-Free Cotton" },
                                    { icon: Award, title: "Certified", text: "ISO 9001:2015" }
                                ].map((box, i) => (
                                    <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-premium transition-shadow">
                                        <box.icon className="text-brass mb-4" size={32} />
                                        <h4 className="font-black text-forest mb-1">{box.title}</h4>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-black">{box.text}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-forest p-12 rounded-[60px] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brass/10 rounded-full blur-[80px]"></div>
                            <h3 className="text-white text-3xl font-black mb-10 relative z-10">Rigorous Testing Parameters</h3>
                            <div className="space-y-8 relative z-10">
                                {qualityPoints.map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brass group-hover:bg-brass group-hover:text-forest transition-colors mt-1">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-cotton font-bold text-lg mb-2">{item.title}</h4>
                                            <p className="text-cotton/50 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Quality;
