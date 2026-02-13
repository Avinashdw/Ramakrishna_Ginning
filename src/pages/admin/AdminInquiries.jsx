import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { MessageSquare, Clock, CheckCircle2, ExternalLink, Filter, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, 'inquiries', id), { status: newStatus });
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'responded': return 'bg-brass/10 text-forest border-brass/20';
            case 'resolved': return 'bg-green-50 text-green-600 border-green-100';
            default: return 'bg-gray-50 text-gray-400 border-gray-100';
        }
    };

    const filteredInquiries = inquiries.filter(inq => filter === 'all' || inq.status === filter);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-brass/20 border-t-brass rounded-full animate-spin"></div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Scanning Data Arrays...</p>
        </div>
    );

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
                        <h1 className="text-4xl font-black text-forest tracking-tight uppercase">Service Control</h1>
                        <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.3em] mt-1">Inquiry Pipeline • Real-time Requisitions</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-premium group">
                    <div className="p-3 bg-cotton rounded-xl text-brass group-focus-within:bg-forest group-focus-within:text-cotton transition-colors">
                        <Filter size={18} />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 font-black text-forest uppercase tracking-widest text-[10px] pr-10 cursor-pointer"
                    >
                        <option value="all">Full Spectrum</option>
                        <option value="pending">Awaiting Action</option>
                        <option value="responded">In Dialogue</option>
                        <option value="resolved">Finalized</option>
                    </select>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[40px] shadow-premium border border-gray-50 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-cotton/50 border-b border-gray-50">
                                <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Partner Intelligence</th>
                                <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Service Stream</th>
                                <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Protocol Status</th>
                                <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Timestamp</th>
                                <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Directives</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {filteredInquiries.map((inq, index) => (
                                    <motion.tr
                                        key={inq.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-cotton/30 transition-colors group"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl forest-gradient flex items-center justify-center text-cotton font-black shadow-sm group-hover:scale-110 transition-transform shrink-0">
                                                    {inq.userName?.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-black text-forest uppercase tracking-tight text-sm leading-none mb-1.5">{inq.userName}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold tracking-widest">{inq.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="font-bold text-forest text-sm">{inq.service}</div>
                                            <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1 opacity-50">Industrial Log</div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(inq.status)}`}>
                                                {inq.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                                <Clock size={12} className="text-brass" />
                                                {inq.createdAt?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="relative inline-block group/select">
                                                <select
                                                    value={inq.status}
                                                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                                                    className="pl-4 pr-10 py-3 text-[10px] font-black uppercase tracking-widest bg-cotton hover:bg-white border border-gray-100 rounded-xl focus:ring-4 focus:ring-brass/5 focus:border-brass/30 transition-all appearance-none cursor-pointer text-forest"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="responded">Responded</option>
                                                    <option value="resolved">Resolved</option>
                                                </select>
                                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300" />
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filteredInquiries.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="w-20 h-20 bg-cotton rounded-full flex items-center justify-center text-gray-200 mx-auto mb-6 shadow-inner">
                                <MessageSquare size={32} />
                            </div>
                            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">No matches found in communication registry</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AdminInquiries;
