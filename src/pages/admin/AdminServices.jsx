import React from 'react';
import { Settings, Plus, Edit, Trash2, Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminServices = () => {
    const services = [
        { id: 1, name: 'Cotton Ginning', category: 'Phase 1', status: 'Active' },
        { id: 2, name: 'Bale Pressing', category: 'Phase 2', status: 'Active' },
        { id: 3, name: 'Seed Processing', category: 'By-Product', status: 'Active' },
        { id: 4, name: 'HVI Testing', category: 'Quality', status: 'Active' },
    ];

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
            >
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-brass rounded-full"></div>
                    <div>
                        <h1 className="text-4xl font-black text-forest tracking-tight uppercase">Service Matrix</h1>
                        <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.3em] mt-1">Operation Management • ISO Config</p>
                    </div>
                </div>

                <button className="brass-gradient text-forest px-10 py-5 rounded-2xl font-black shadow-brass hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                    <Plus size={20} />
                    Integrate New Service
                </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-50 group hover:border-brass/20 transition-all"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 bg-cotton text-forest rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-forest group-hover:text-cotton transition-colors">
                                <Briefcase size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 flex items-center justify-center bg-cotton text-gray-400 rounded-xl hover:text-forest transition-colors">
                                    <Edit size={18} />
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center bg-cotton text-gray-400 rounded-xl hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-forest mb-2">{service.name}</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-brass uppercase tracking-widest">{service.category}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{service.status}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdminServices;
