"use client";
import { ShieldCheck, Zap, Code2, GitMerge } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Features() {

    return (
        <section className="py-24 bg-background relative border-y border-white/5 overflow-hidden">
            {/* Background lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#00d4d4]/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[#00d4d4] text-xs font-bold tracking-widest uppercase mx-auto"
                    >
                        Core Infrastructure
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="h2-scale font-bold text-white max-w-2xl mx-auto tracking-tight"
                    >
                        Built for enterprise-grade <br />
                        <span className="text-[#8a9ab0]">hiring certainty.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Card 1: Live Anti-Cheat Engine */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel glass-panel-hover rounded-[24px] p-8 relative overflow-hidden group flex flex-col h-full"
                    >
                        {/* Animated Code Background */}
                        <div className="absolute -inset-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 font-mono text-[8px] whitespace-pre text-[#00d4d4] pointer-events-none overflow-hidden select-none">
                            {`function monitorBehavior(session) {
    if (session.tabSwitches > 0) {
        logViolation("TAB_SWITCH");
        decreaseTrustScore(15);
    }
    if (detectVirtualMachine(session)) {
        flagForReview("VM_DETECTED");
        terminateSession();
    }
    analyzeKeystrokeDynamics(session.keys);
    return calculateConfidence();
}`}
                        </div>

                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-[#00d4d4]/10 group-hover:border-[#00d4d4]/30 transition-all">
                            <Code2 className="text-[#00d4d4]" size={24} />
                        </div>
                        <h3 className="text-xl font-sora font-semibold text-white mb-3">Live Anti-Cheat Engine</h3>
                        <p className="text-[#8a9ab0] leading-relaxed text-sm mb-8 flex-grow">
                            Real-time monitoring of browser behavior, keystroke dynamics, and tab-switching. If they cheat, we catch it instantly.
                        </p>

                        {/* Mini UI Mock inside card */}
                        <div className="mt-auto bg-black/40 rounded-lg p-4 border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-[#8a9ab0]">Process Monitor</span>
                                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#00d4d4] w-full origin-left animate-[scale-x_2s_ease-in-out_infinite_alternate]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: VeriQ Trust Score™ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel glass-panel-hover rounded-[24px] p-8 relative overflow-hidden group flex flex-col h-full ring-1 ring-[#00d4d4]/20 shadow-[0_0_40px_rgba(0,212,212,0.05)]"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#00d4d4]/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-[#00d4d4]/20 transition-all" />

                        <div className="w-12 h-12 bg-[#00d4d4]/10 rounded-xl flex items-center justify-center mb-6 border border-[#00d4d4]/20">
                            <ShieldCheck className="text-[#00d4d4]" size={24} />
                        </div>
                        <h3 className="text-xl font-sora font-semibold text-white mb-3 text-gradient-cyan">VeriQ Trust Score™</h3>
                        <p className="text-[#8a9ab0] leading-relaxed text-sm mb-8 flex-grow">
                            A single normalized metric distilling thousands of data points across skills, behavior, and resume authenticity into one definitive score.
                        </p>

                        {/* Circular Score UI Mock */}
                        <div className="mt-auto flex justify-center py-4">
                            <div className="relative flex items-center justify-center w-32 h-32">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                    <motion.circle
                                        cx="64" cy="64" r="56" fill="transparent"
                                        stroke="#00d4d4" strokeWidth="8"
                                        strokeDasharray="351.858"
                                        initial={{ strokeDashoffset: 351.858 }}
                                        whileInView={{ strokeDashoffset: 351.858 - (351.858 * 0.94) }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute flex flex-col justify-center items-center">
                                    <span className="text-3xl font-bold font-sora text-white">94</span>
                                    <span className="text-[10px] text-[#8a9ab0] uppercase tracking-wider">Score</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: AI Claim Validation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-panel glass-panel-hover rounded-[24px] p-8 relative overflow-hidden group flex flex-col h-full"
                    >
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-[#00d4d4]/10 group-hover:border-[#00d4d4]/30 transition-all">
                            <GitMerge className="text-[#00d4d4]" size={24} />
                        </div>
                        <h3 className="text-xl font-sora font-semibold text-white mb-3">AI Claim Validation</h3>
                        <p className="text-[#8a9ab0] leading-relaxed text-sm mb-8 flex-grow">
                            We map the candidate's actual test performance directly against the specific skills claimed on their uploaded resume.
                        </p>

                        {/* Comparison UI Mock */}
                        <div className="mt-auto bg-black/40 rounded-xl border border-white/5 overflow-hidden">
                            <div className="p-3 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <span className="text-xs text-[#8a9ab0]">Claim: <span className="text-white">Senior React</span></span>
                                <span className="text-xs text-green-400">Verified</span>
                            </div>
                            <div className="p-3 flex justify-between items-center">
                                <span className="text-xs text-[#8a9ab0]">Claim: <span className="text-white">Expert Python</span></span>
                                <span className="text-xs text-red-400">Mismatch</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
