import React from 'react';
import Navbar from '../components/Navbar';
import { Users, FileText, Activity, TrendingUp, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24 selection:bg-indigo-100">
            <Navbar />

            {/* Aesthetic Hero Header */}
            <div className="mesh-bg pt-28 pb-44 px-6 rounded-b-[4rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -ml-32 -mt-32" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-indigo-300 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Student Command Center</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                            Welcome back,<br />
                            <span className="text-indigo-400 italic">Future Dev! 🚀</span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Courses In Progress', value: '4', icon: <BookOpen />, color: 'bg-indigo-600', text: 'text-indigo-600' },
                        { label: 'Resume Score', value: '82', icon: <FileText />, color: 'bg-emerald-500', text: 'text-emerald-600' },
                        { label: 'Interviews Prep', value: '12', icon: <Award />, color: 'bg-amber-500', text: 'text-amber-600' },
                        { label: 'Global Rank', value: '#452', icon: <Activity />, color: 'bg-rose-500', text: 'text-rose-600' }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="glass-card p-6 rounded-[2.5rem] border-white/40 shadow-xl group cursor-help transition-all"
                        >
                            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</h3>
                            <p className={`text-4xl font-black ${stat.text} tracking-tight`}>{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Activity Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 glass-card rounded-[3rem] border-white/40 shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Progress</h2>
                            <button className="text-indigo-600 font-black text-xs uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">Details</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-5">Module</th>
                                        <th className="px-8 py-5">Action</th>
                                        <th className="px-8 py-5 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 text-sm">
                                    <tr className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6 font-black text-slate-700">Learning Path</td>
                                        <td className="px-8 py-6 text-slate-500 font-medium italic">Generated roadmap for React.js</td>
                                        <td className="px-8 py-6 text-right"><span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">Success</span></td>
                                    </tr>
                                    <tr className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6 font-black text-slate-700">Resume Lab</td>
                                        <td className="px-8 py-6 text-slate-500 font-medium italic">Analyzed "Frontend_Dev_v2.pdf"</td>
                                        <td className="px-8 py-6 text-right"><span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100 underline decoration-indigo-200 decoration-2 underline-offset-4 font-black">82/100</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* High Demand 2026 Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-dark rounded-[3rem] p-10 text-white shadow-2xl border-white/5 relative overflow-hidden group"
                    >
                        {/* Decorative bloom */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-indigo-500/30 transition-colors" />

                        <h2 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tighter">
                            <TrendingUp size={28} className="text-indigo-400" /> High Demand 2026
                        </h2>
                        <div className="space-y-5">
                            {[
                                { skill: 'Prompt Engineering', demand: '+150%', role: 'AI Specialist' },
                                { skill: 'NVIDIA CUDA Mastery', demand: '+85%', role: 'Hardware Architect' },
                                { skill: 'Zero Trust Auth', demand: '+110%', role: 'Cybersecurity' },
                                { skill: 'Edge Computing', demand: '+60%', role: 'Cloud Engineer' }
                            ].map((item, id) => (
                                <motion.div
                                    key={id}
                                    whileHover={{ x: 5 }}
                                    className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 hover:bg-white/10 transition-all cursor-pointer group/item"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-black text-indigo-100 text-sm tracking-tight">{item.skill}</span>
                                        <span className="text-[10px] font-black bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/20">{item.demand}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.role}</p>
                                </motion.div>
                            ))}
                        </div>
                        <button className="w-full mt-10 bg-white text-slate-900 font-black py-4 rounded-[1.5rem] hover:bg-indigo-50 transition-all shadow-xl hover:shadow-indigo-500/20 active:scale-95">
                            Up-Skill Now
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
