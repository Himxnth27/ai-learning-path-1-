import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Map, ArrowRight, Clock, CheckCircle, FileText, Play } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const LearningPath = () => {
    const [goal, setGoal] = useState('');
    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateRoadmap = async (e) => {
        e.preventDefault();
        if (!goal) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/skills/generate', { goal });
            setRoadmap(res.data.roadmap);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24 selection:bg-indigo-100 selection:text-indigo-900">
            <Navbar />

            <div className="mesh-bg pb-48 pt-32 px-6 rounded-b-[5rem] relative overflow-hidden shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[140px] -mr-60 -mt-60 animate-pulse" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', duration: 1 }}
                        className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md text-indigo-300 mb-10 border border-white/10 shadow-2xl"
                    >
                        <Sparkles size={40} className="animate-pulse" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
                    >
                        Skill<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"> Architect</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 text-xl md:text-2xl mb-14 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        We use AI to engineer high-demand learning paths for the 2026 tech landscape.
                    </motion.p>

                    <motion.form
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onSubmit={generateRoadmap}
                        className="flex flex-col md:flex-row gap-4 glass-card p-4 rounded-[3rem] border border-white/10 shadow-2xl max-w-3xl mx-auto mb-10 group"
                    >
                        <input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="Describe your career goal..."
                            className="flex-1 bg-transparent px-8 py-5 rounded-3xl outline-none text-white text-lg placeholder-gray-600 font-semibold"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-[2.5rem] font-black text-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Build My Path</span>
                                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </motion.form>

                    {/* Curated Suggestions */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <span className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mr-2">Trending 2026</span>
                        {['AI Engineer', 'Cloud Architect', 'Cybersecurity'].map((role, idx) => (
                            <motion.button
                                key={role}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + (idx * 0.1) }}
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                onClick={() => setGoal(role)}
                                className="px-6 py-2.5 rounded-full border border-white/10 glass-dark text-gray-300 text-sm font-bold hover:text-white transition-all shadow-lg"
                            >
                                {role}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
                {roadmap && roadmap.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-50"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                            <Map className="text-indigo-600" />
                            Your Personal Roadmap: <span className="text-indigo-600">{goal}</span>
                        </h2>

                        {/* Roadmap Steps */}
                        <div className="space-y-6">
                            {roadmap.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-10 border-l-2 border-indigo-100 last:border-0 pb-8"
                                >
                                    {/* Step Circle */}
                                    <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-white border-4 border-indigo-600 shadow-md" />

                                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-xl font-black text-slate-800 mb-1">{item.step}</h3>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                                        <Clock size={14} /> {item.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 font-medium mb-6 leading-relaxed bg-slate-50 p-4 rounded-2xl italic">
                                            "{item.description}"
                                        </p>

                                        {/* Resource Buttons */}
                                        <div className="flex flex-wrap gap-3">
                                            <a
                                                href={item.docLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 text-white text-sm font-bold hover:bg-slate-700 transition-all shadow-lg shadow-slate-200"
                                            >
                                                <FileText size={18} /> Documentation
                                            </a>
                                            <a
                                                href={item.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-all shadow-lg shadow-red-200"
                                            >
                                                <Play size={18} /> Watch Tutorial
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default LearningPath;
