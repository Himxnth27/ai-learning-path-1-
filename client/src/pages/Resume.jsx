import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Resume = () => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
        setResult(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a PDF file first.");
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        setAnalyzing(true);
        try {
            const response = await axios.post('http://localhost:5000/api/resume/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(response.data.data);
        } catch (err) {
            console.error(err);
            setError("Upload failed. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans selection:bg-indigo-100">
            <Navbar />

            {/* Aesthetic Hero Header */}
            <div className="mesh-bg pt-28 pb-44 px-6 rounded-b-[4rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
                    >
                        Resume<span className="text-indigo-400"> Intelligence</span>
                    </motion.h1>
                    <p className="text-gray-400 text-xl font-medium max-w-xl mx-auto leading-relaxed">
                        Don't just apply. Analyze your resume with 2026 AI standards and land your dream role.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Upload Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border-white/40 shadow-2xl h-fit sticky top-24"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black text-slate-800 mb-2">Secure Upload</h2>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">PDF Files Only · AES-256</p>
                        </div>

                        <div className="border-4 border-dashed border-indigo-100 rounded-[2rem] p-10 text-center hover:border-indigo-300 hover:bg-indigo-50/50 transition-all relative group cursor-pointer overflow-hidden">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            <div className="flex flex-col items-center relative z-10">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="p-6 bg-indigo-600 text-white rounded-3xl mb-4 shadow-xl shadow-indigo-200"
                                >
                                    <Upload size={36} />
                                </motion.div>
                                <h3 className="text-lg font-black text-slate-700 mb-1">
                                    {file ? file.name : "Drop Resume"}
                                </h3>
                                <p className="text-sm text-slate-400 font-bold">
                                    {file ? "Click to change" : "or click to browse"}
                                </p>
                            </div>
                            {/* Decorative sparkle */}
                            <div className="absolute -bottom-4 -right-4 text-indigo-100 group-hover:text-indigo-200 transition-colors">
                                <FileText size={80} />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-6 p-4 bg-red-50 text-red-500 rounded-2xl text-sm font-bold flex items-center gap-3 border border-red-100"
                            >
                                <X size={20} className="shrink-0" /> {error}
                            </motion.div>
                        )}

                        <button
                            onClick={handleUpload}
                            disabled={!file || analyzing}
                            className={`w-full mt-8 py-5 rounded-[2rem] font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${analyzing
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-indigo-500/30'
                                }`}
                        >
                            {analyzing ? (
                                <div className="w-6 h-6 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                            ) : (
                                <>
                                    Analyze Now
                                    <CheckCircle size={22} />
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Results Section */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card rounded-[3rem] p-10 border-white/40 shadow-2xl overflow-hidden relative min-h-[500px]"
                        >
                            {!result ? (
                                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 3 }}
                                        className="p-8 bg-slate-50 text-slate-200 rounded-full mb-6"
                                    >
                                        <FileText size={80} strokeWidth={1} />
                                    </motion.div>
                                    <h3 className="text-2xl font-black text-slate-300">Awaiting Signal...</h3>
                                    <p className="text-slate-400 max-w-xs mt-2 font-medium">Upload your resume to see the AI analysis report here.</p>
                                </div>
                            ) : (
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                        <div>
                                            <span className="text-indigo-600 font-black text-xs uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full mb-3 inline-block">Analysis Complete</span>
                                            <h2 className="text-4xl font-black text-slate-800 tracking-tight">AI Feedback</h2>
                                        </div>
                                        <div className={`text-5xl font-black px-8 py-4 rounded-[2rem] shadow-xl ${result.score >= 80 ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100' :
                                            result.score >= 60 ? 'bg-amber-50 text-amber-600 shadow-amber-100' : 'bg-rose-50 text-rose-600 shadow-rose-100'
                                            }`}>
                                            {result.score}<span className="text-base opacity-40 ml-1">/100</span>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <div>
                                            <h3 className="text-lg font-black text-slate-700 flex items-center gap-3 mb-4">
                                                <div className="w-2 h-8 bg-emerald-500 rounded-full" /> Key Strengths
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {result.strengths.map((item, idx) => (
                                                    <div key={idx} className="bg-emerald-50/50 p-4 rounded-2xl text-slate-700 font-bold text-sm border border-emerald-100 flex items-start gap-3">
                                                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-black text-slate-700 flex items-center gap-3 mb-4">
                                                <div className="w-2 h-8 bg-amber-500 rounded-full" /> Improvements Needed
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {result.improvements.map((item, idx) => (
                                                    <div key={idx} className="bg-amber-50/50 p-4 rounded-2xl text-slate-700 font-bold text-sm border border-amber-100 flex items-start gap-3">
                                                        <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-black text-slate-700 flex items-center gap-3 mb-4 uppercase tracking-widest text-xs">Keywords Detected</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {result.keywords_found.map((kw, idx) => (
                                                    <span key={idx} className="bg-slate-100 text-slate-600 px-5 py-2 rounded-2xl text-xs font-black shadow-sm border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
