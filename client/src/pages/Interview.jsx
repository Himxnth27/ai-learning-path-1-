import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Interview = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [openQuestionId, setOpenQuestionId] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/interview');
                setQuestions(res.data);
            } catch (err) {
                console.error(err);
                setQuestions([
                    { id: 1, category: 'AI Engineer', question_text: 'How do you handle "Hallucinations" in LLMs?', difficulty: 'Hard', sample_answer: 'Using RAG (Retrieval Augmented Generation), prompt constraints, and fact-checking models.' },
                    { id: 2, category: 'Cloud Architect', question_text: 'What is Multi-Cloud latency optimization?', difficulty: 'Medium', sample_answer: 'Using globally distributed Edge networks and cross-region VPC peering.' },
                    { id: 3, category: 'Cybersecurity', question_text: 'Explain Zero Trust Architecture.', difficulty: 'Hard', sample_answer: '"Never trust, always verify." Every access request is authenticated and authorized based on dynamic policy.' },
                    { id: 4, category: 'React 19', question_text: 'What are React Server Components?', difficulty: 'Medium', sample_answer: 'Components that render on the server and reduce the amount of JS sent to the client.' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const categories = ['All', ...new Set(questions.map(q => q.category))];
    const filteredQuestions = selectedCategory === 'All'
        ? questions
        : questions.filter(q => q.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24 selection:bg-indigo-100">
            <Navbar />

            {/* Aesthetic Hero Header */}
            <div className="mesh-bg pt-28 pb-44 px-6 rounded-b-[4rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
                    >
                        Practice<span className="text-purple-400"> Arena</span>
                    </motion.h1>
                    <p className="text-gray-400 text-xl font-medium max-w-xl mx-auto leading-relaxed">
                        Refine your responses for 2026 tech interviews. From AI concepts to behavioral strategy.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-20">
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-10 p-2 glass-card rounded-[2rem] border-white/40 shadow-xl overflow-x-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all ${selectedCategory === cat
                                ? 'bg-slate-900 text-white shadow-xl'
                                : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    {filteredQuestions.map((q, index) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            layout
                            className="glass-card rounded-[2.5rem] border-white/40 shadow-lg overflow-hidden group hover:shadow-2xl transition-all"
                        >
                            <button
                                onClick={() => setOpenQuestionId(openQuestionId === q.id ? null : q.id)}
                                className="w-full text-left p-8 flex justify-between items-start gap-6 hover:bg-white/50 transition-colors"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="mt-1 p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm">
                                        <HelpCircle size={24} />
                                    </div>
                                    <div>
                                        <div className="flex gap-2 mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{q.category}</span>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' :
                                                q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' :
                                                    'bg-rose-50 text-rose-600'
                                                }`}>{q.difficulty}</span>
                                        </div>
                                        <h3 className="font-black text-slate-800 text-xl leading-tight tracking-tight">{q.question_text}</h3>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ rotate: openQuestionId === q.id ? 180 : 0 }}
                                    className="p-3 bg-slate-50 rounded-xl text-slate-300 group-hover:text-slate-500 transition-colors"
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </button>

                            {openQuestionId === q.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="px-8 pb-8 pt-2"
                                >
                                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex gap-4">
                                        <div className="shrink-0 p-3 bg-white rounded-xl text-indigo-500 h-fit shadow-sm">
                                            <MessageCircle size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Ideal Response Strategy</h4>
                                            <p className="text-slate-600 font-medium leading-relaxed italic">
                                                "{q.sample_answer}"
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Interview;
