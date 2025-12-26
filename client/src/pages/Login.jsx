import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, GraduationCap, ArrowRight, Star, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAction = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen mesh-bg flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-500">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] -ml-20 -mb-20" />

            {/* Float Elements */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute top-20 left-20 text-white/5 hidden lg:block"
            >
                <Code size={120} strokeWidth={1} />
            </motion.div>

            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="absolute bottom-20 right-20 text-white/5 hidden lg:block"
            >
                <Star size={100} strokeWidth={1} />
            </motion.div>

            {/* Main Card */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-dark border-white/10 rounded-[3rem] shadow-2xl p-12 w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="inline-flex p-5 rounded-3xl bg-indigo-600/30 text-indigo-300 mb-8 border border-white/10 shadow-2xl"
                    >
                        <GraduationCap size={44} />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tighter">
                        Skill<span className="text-indigo-400">Path</span>
                    </h1>
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
                        The 2026 Student Terminal
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleAction}>
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                key="name"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    className="w-full bg-white/5 border border-white/5 text-white px-6 py-4 rounded-2xl focus:border-indigo-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 font-bold"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full bg-white/5 border border-white/5 text-white px-6 py-4 rounded-2xl focus:border-indigo-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 font-bold"
                    />

                    <input
                        type="password"
                        placeholder="Security Key"
                        required
                        className="w-full bg-white/5 border border-white/5 text-white px-6 py-4 rounded-2xl focus:border-indigo-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 font-bold"
                    />

                    <motion.button
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-indigo-600 text-white font-black py-5 rounded-[1.5rem] shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-3 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>{isLogin ? 'Initialize Session' : 'Create Passport'}</span>
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 text-sm font-bold">
                        {isLogin ? "New user? " : "Already verified? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-500/30 underline-offset-8"
                        >
                            {isLogin ? 'Register My ID' : 'Return to Login'}
                        </button>
                    </p>
                </div>
            </motion.div>

            {/* Ver Badge */}
            <div className="absolute bottom-8 right-8 text-white/10 text-[10px] font-black tracking-[0.5em] uppercase">
                SkillPath AI // Platform v1.02
            </div>
        </div>
    );
};

export default Login;
