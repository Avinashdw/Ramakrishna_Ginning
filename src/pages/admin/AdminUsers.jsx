import React from 'react';
import { Shield, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const AdminUsers = () => {
    const { userData } = useAuth();

    return (
        <div className="space-y-8 md:space-y-12 pb-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8"
            >
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 md:h-10 bg-brass rounded-full"></div>
                    <div>
                        <h1 className="text-2xl md:text-4xl font-black text-forest tracking-tight uppercase">Admin Access</h1>
                        <p className="text-[9px] md:text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1">Single Administrator • Full System Control</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[32px] md:rounded-[40px] shadow-premium border border-gray-50 overflow-hidden"
            >
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                        {/* Admin Avatar */}
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-[24px] md:rounded-[32px] forest-gradient text-white font-black flex items-center justify-center shadow-2xl text-3xl md:text-4xl shrink-0">
                            {userData?.name?.charAt(0) || 'A'}
                        </div>

                        {/* Admin Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3 md:mb-4">
                                <h2 className="text-2xl md:text-3xl font-black text-forest uppercase tracking-tight">{userData?.name || 'Administrator'}</h2>
                                <div className="px-4 py-1.5 rounded-full bg-brass/10 border border-brass/20">
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brass">System Admin</span>
                                </div>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail size={16} className="text-brass shrink-0" />
                                    <span className="font-bold text-sm md:text-base">{userData?.email || import.meta.env.VITE_ADMIN_EMAIL}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Shield size={16} className="text-brass shrink-0" />
                                    <span className="font-bold text-sm md:text-base">Full Administrative Privileges</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar size={16} className="text-brass shrink-0" />
                                    <span className="font-bold text-sm md:text-base">Active Since 2004</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permissions Section */}
                    <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-gray-100">
                        <h3 className="text-lg md:text-xl font-black text-forest uppercase tracking-tight mb-6 md:mb-8">System Permissions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {[
                                'Cotton Rate Management',
                                'Inquiry Viewing',
                                'Service Management',
                                'Gallery Management',
                                'System Configuration',
                                'Full Database Access'
                            ].map((permission, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 md:p-5 bg-cotton/30 rounded-2xl border border-gray-100">
                                    <div className="w-2 h-2 bg-brass rounded-full shrink-0"></div>
                                    <span className="font-bold text-forest text-xs md:text-sm">{permission}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="mt-8 md:mt-12 p-6 md:p-8 bg-forest/5 rounded-2xl md:rounded-[24px] border border-forest/10">
                        <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
                            <span className="font-black text-forest">Security Note:</span> This system is configured for single administrator access only. All administrative functions are controlled by this account with full system privileges.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminUsers;
