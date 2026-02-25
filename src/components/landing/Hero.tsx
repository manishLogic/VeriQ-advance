"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldAlert, Timer, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const WORDS = ["proof", "certainty", "verification", "confidence", "data", "trust"];

export default function Hero() {
    const [score, setScore] = useState(65);
    const [timeLeft, setTimeLeft] = useState(10);
    const [wordIndex, setWordIndex] = useState(0);

    // Mock live score updates and timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 10));
        }, 1000);

        const scoreInterval = setInterval(() => {
            setScore((prev) => Math.min(100, prev + Math.floor(Math.random() * 5)));
        }, 2000);

        const wordInterval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % WORDS.length);
        }, 2800);

        return () => {
            clearInterval(timer);
            clearInterval(scoreInterval);
            clearInterval(wordInterval);
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#00d4d4]/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0088cc]/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Copy */}
                <div className="space-y-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[#00d4d4] text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,212,212,0.1)]"
                    >
                        <ShieldAlert size={14} className="mr-2" />
                        AI Hiring Verification Platform
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h1-scale font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 tracking-tight flex flex-col items-start sm:block"
                    >
                        Hire with
                        <span className="inline-flex relative overflow-hidden align-bottom h-[1.2em] min-w-[300px] ml-0 mt-2 sm:mt-0 sm:ml-[0.3em]">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={wordIndex}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="absolute left-0 text-gradient-cyan drop-shadow-[0_0_30px_rgba(0,212,212,0.3)] whitespace-nowrap"
                                >
                                    {WORDS[wordIndex]},
                                    {/* 2px glowing gradient underline */}
                                    <motion.span
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#00d4d4] to-transparent origin-left opacity-80 blur-[1px]"
                                    />
                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5e5] to-transparent origin-left"
                                    />
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        <br className="hidden sm:block" />
                        not probability.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-[#8a9ab0] max-w-xl leading-relaxed"
                    >
                        AI-verified skill assessments, resume authenticity scoring, and behavioral validation — all in one structured hiring pipeline.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
                    >
                        <button className="group relative flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-[#00d4d4] text-[#030712] font-semibold rounded-2xl transition-all hover:bg-[#00e5e5] hover:shadow-[0_0_30px_rgba(0,212,212,0.4)] overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                Start Free Trial <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Button subtle inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </button>

                        <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-white font-medium rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all">
                            View Sample Report
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap items-center gap-6 pt-6 text-sm text-[#8a9ab0]"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#00d4d4]" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#00d4d4]" />
                            <span>SOC-2 ready architecture</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#00d4d4]" />
                            <span>2 min setup</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Animated UI Mock */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                    className="relative z-10 perspective-1000 hidden lg:block"
                >
                    <div className="glass-panel rounded-[24px] p-6 border border-white/10 shadow-2xl relative overflow-hidden group">

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-white font-medium">React Native Architecture Test</h3>
                                <p className="text-xs text-[#8a9ab0] mt-1">Candidate: Sarah Jenkins</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-medium animate-pulse">
                                <ShieldAlert size={14} />
                                Tab switch detected
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-sm text-[#8a9ab0] mb-2">Live Trust Score™</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4d4] to-white">
                                            {score}
                                        </span>
                                        <span className="text-[#8a9ab0]">/ 100</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-[#8a9ab0] mb-2">Time Remaining</p>
                                    <div className="flex items-center gap-2 text-xl font-mono text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                                        <Timer size={18} className="text-[#00d4d4]" />
                                        00:00:{timeLeft.toString().padStart(2, '0')}
                                    </div>
                                </div>
                            </div>

                            {/* Progress bar mock */}
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#00d4d4] to-[#0088cc] rounded-full"
                                    animate={{ width: `${score}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                <div className="bg-[#030712]/50 p-4 rounded-xl border border-white/5">
                                    <p className="text-xs text-[#8a9ab0] mb-1">Resume Alignment</p>
                                    <p className="text-lg font-medium text-white">94% match</p>
                                </div>
                                <div className="bg-[#030712]/50 p-4 rounded-xl border border-white/5">
                                    <p className="text-xs text-[#8a9ab0] mb-1">Behavioral Risk</p>
                                    <p className="text-lg font-medium text-green-400">Low</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Decorative floating elements */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -right-8 -top-8 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl z-20"
                    >
                        <div className="flex bg-[#00d4d4]/20 p-2 rounded-full mb-2 w-fit">
                            <CheckCircle2 size={20} className="text-[#00d4d4]" />
                        </div>
                        <p className="text-xs font-semibold text-white">Identity Verified</p>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
