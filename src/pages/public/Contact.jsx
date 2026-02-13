import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className="bg-cotton min-h-screen">
            {/* Header */}
            <section className="bg-forest py-20 md:py-32 lg:py-40 border-b border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-brass font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs mb-4 md:mb-6 block">Global Network</span>
                        <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-none text-balance">
                            Connect with <br />
                            <span className="text-brass italic">Excellence.</span>
                        </h1>
                        <p className="text-sm md:text-base lg:text-xl text-cotton/60 max-w-2xl mx-auto font-medium text-balance leading-relaxed">
                            Our team is ready to facilitate your requirements for premium fiber, logistics, or agricultural partnerships.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                        {/* Contact Info */}
                        <motion.div {...fadeIn}>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-forest mb-10 md:mb-12 text-center lg:text-left">Headquarters</h2>
                            <div className="space-y-6 md:space-y-8 lg:space-y-10">
                                {[
                                    { icon: MapPin, title: "Operations Hub", text: "Ramkrishna Cotton Ginning & Pressing, Maharashtra, India" },
                                    { icon: Phone, title: "Direct Contact", text: "+91 7875746795" },
                                    { icon: Mail, title: "Email Inquiry", text: "krishnatellawar999@gmail.com" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 lg:gap-8 group text-center sm:text-left">
                                        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 forest-gradient rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                                            <item.icon size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
                                        </div>
                                        <div className="pt-1 md:pt-2">
                                            <h4 className="text-[10px] font-black text-brass uppercase tracking-widest mb-1 md:mb-2">{item.title}</h4>
                                            <p className="text-sm md:text-base lg:text-lg font-bold text-forest leading-relaxed">{item.text}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-8 md:pt-10 border-t border-gray-100 mt-8 md:mt-10 flex flex-col items-center lg:items-start gap-6">
                                    <div className="text-center lg:text-left">
                                        <h4 className="text-base md:text-lg lg:text-xl font-black text-forest mb-2">Instant Response?</h4>
                                        <p className="text-gray-400 font-medium mb-5 md:mb-6 text-sm md:text-base">Chat directly with our operations manager via WhatsApp.</p>
                                        <a
                                            href="https://wa.me/917875746795"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 md:gap-3 bg-[#25D366] hover:scale-105 text-white px-6 md:px-8 lg:px-10 py-4 md:py-5 rounded-2xl font-black transition-all shadow-[0_10px_40px_-10px_rgba(37,211,102,0.4)] text-sm md:text-base touch-target"
                                        >
                                            <MessageCircle size={20} className="md:w-6 md:h-6" />
                                            WhatsApp Business
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 md:p-12 lg:p-16 rounded-[32px] md:rounded-[48px] lg:rounded-[60px] shadow-premium border border-gray-50 relative"
                        >
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-forest mb-6 md:mb-8 lg:mb-10">Send Inquiry</h3>
                            <form className="space-y-5 md:space-y-6 lg:space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity</label>
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full px-5 md:px-6 py-4 md:py-5 rounded-xl md:rounded-2xl bg-cotton border border-gray-100 focus:bg-white focus:border-brass/50 focus:ring-0 transition-all font-bold text-forest placeholder:text-gray-300 text-sm md:text-base touch-target"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Communication</label>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full px-5 md:px-6 py-4 md:py-5 rounded-xl md:rounded-2xl bg-cotton border border-gray-100 focus:bg-white focus:border-brass/50 focus:ring-0 transition-all font-bold text-forest placeholder:text-gray-300 text-sm md:text-base touch-target"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Reason</label>
                                    <input
                                        type="text"
                                        placeholder="Service Interested In"
                                        className="w-full px-5 md:px-6 py-4 md:py-5 rounded-xl md:rounded-2xl bg-cotton border border-gray-100 focus:bg-white focus:border-brass/50 focus:ring-0 transition-all font-bold text-forest placeholder:text-gray-300 text-sm md:text-base touch-target"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Detail</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Provide specific details about your requirement..."
                                        className="w-full px-5 md:px-6 py-4 md:py-5 rounded-xl md:rounded-2xl bg-cotton border border-gray-100 focus:bg-white focus:border-brass/50 focus:ring-0 transition-all font-bold text-forest placeholder:text-gray-300 resize-none text-sm md:text-base"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full forest-gradient text-white py-5 md:py-6 rounded-2xl font-black text-sm md:text-base lg:text-lg shadow-premium hover:shadow-brass transition-all flex items-center justify-center gap-2 md:gap-3 active:scale-[0.98] touch-target"
                                >
                                    Submit Requirement <Send size={18} className="md:w-5 md:h-5" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-10 md:py-16 lg:py-20 px-4">
                <div className="max-w-7xl mx-auto h-[350px] md:h-[500px] lg:h-[600px] rounded-[32px] md:rounded-[48px] lg:rounded-[60px] overflow-hidden shadow-premium border-4 md:border-6 lg:border-8 border-white">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d401.38278502593494!2d77.40013215094079!3d19.57015791349809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1b9b01be2cc01%3A0xf0c9fecccfb88ba0!2sRamkrishna%20Cotton%20Ginning%20%26%20Pressing!5e1!3m2!1sen!2sin!4v1770881203244!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Office Location"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default Contact;
