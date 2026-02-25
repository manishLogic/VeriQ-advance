"use client";
import { Upload, FileSearch, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        icon: Upload,
        title: "Upload Resume",
        desc: "Drag and drop any PDF resume. Our parser instantly extracts skills and history."
    },
    {
        icon: FileSearch,
        title: "AI Analysis",
        desc: "VeriQ's AI cross-references claims against global databases and benchmarks.",
        badge: "🔥 CORE DIFFERENTIATOR",
        active: true
    },
    {
        icon: Zap,
        title: "Timed Skill Test",
        desc: "Complete 10 unique MCQs per skill. 10s timer per question. No repeats."
    },
    {
        icon: Award,
        title: "Trust Score Generated",
        desc: "Get a comprehensive score combining resume authenticity + skill validation."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#030712]">
            {/* Background lighting (Optimized) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,212,212,0.05) 0%, rgba(0,212,212,0) 70%)' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="h2-scale font-bold text-white tracking-tight"
                    >
                        How Veri<span className="text-[#00d4d4]">Q</span> Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#8a9ab0] text-lg max-w-2xl mx-auto"
                    >
                        From resume upload to verified trust score in 4 simple steps.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connecting Animated Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-[45px] left-[12%] right-[12%] h-[2px] bg-white/5">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#00d4d4]/20 via-[#00d4d4] to-[#00d4d4]/20"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
                        {steps.map((step, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 0.5 }}
                                key={idx}
                                className="relative flex flex-col items-center text-center group"
                            >
                                {/* Core Differentiator Badge */}
                                {step.badge && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#00d4d4]/10 border border-[#00d4d4]/30 text-[#00d4d4] text-[10px] font-bold rounded-full whitespace-nowrap z-20 shadow-[0_0_10px_rgba(0,212,212,0.2)]">
                                        {step.badge}
                                    </div>
                                )}

                                {/* Icon Box */}
                                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-all duration-300 ${step.active
                                    ? "bg-[#00d4d4]/20 border-2 border-[#00d4d4] shadow-[0_0_30px_rgba(0,212,212,0.3)]"
                                    : "bg-[#0b1120] border border-white/10 group-hover:border-[#00d4d4]/50 group-hover:shadow-[0_0_20px_rgba(0,212,212,0.1)]"
                                    }`}>
                                    {step.active && (
                                        <div className="absolute inset-0 rounded-2xl border-2 border-[#00d4d4] animate-ping opacity-20" />
                                    )}
                                    <step.icon size={32} className={step.active ? "text-[#00d4d4]" : "text-[#8a9ab0] group-hover:text-white transition-colors"} />

                                    {/* Number Badge */}
                                    <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-[#030712] border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                                        {idx + 1}
                                    </div>
                                </div>

                                <h3 className="text-xl font-sora font-semibold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-[#8a9ab0] leading-relaxed text-sm px-4">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
