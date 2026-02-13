import React from 'react';
import { Image as ImageIcon, Plus, Trash2, Maximize2, Move } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminGallery = () => {
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
                        <h1 className="text-4xl font-black text-forest tracking-tight uppercase">Visual Assets</h1>
                        <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.3em] mt-1">Industrial Documentation • Gallery Config</p>
                    </div>
                </div>

                <button className="brass-gradient text-forest px-10 py-5 rounded-2xl font-black shadow-brass hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                    <Plus size={20} />
                    Upload Industrial Assets
                </button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative h-72 rounded-[32px] overflow-hidden shadow-premium bg-cotton border border-gray-100"
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform duration-500">
                            <ImageIcon size={48} />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-forest to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center z-10">
                            <div className="text-cotton text-[10px] font-black uppercase tracking-widest">Asset #{i}</div>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-cotton flex items-center justify-center backdrop-blur-md transition-colors">
                                    <Maximize2 size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 flex items-center justify-center backdrop-blur-md transition-colors">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 p-2 bg-cotton/50 backdrop-blur-md rounded-lg text-forest opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                            <Move size={14} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdminGallery;
