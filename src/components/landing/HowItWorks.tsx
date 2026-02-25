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
        desc: "VeriQ's AI cross-references claims against global databases and skill benchmarks.",
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
        title: "Receive Trust Score",
        desc: "Get a comprehensive score combining resume authenticity + skill validation."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-sora font-bold text-white"
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
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-white/5 via-[#00d4d4]/30 to-white/5" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className={`relative group bg-[#0d1722] p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 ${step.active
                                        ? "border-[#00d4d4]/50 shadow-[0_0_30px_rgba(0,212,212,0.15)]"
                                        : "border-white/5 hover:border-[#00d4d4]/30 hover:shadow-[0_0_20px_rgba(0,212,212,0.1)]"
                                    }`}
                            >
                                {/* Number Badge */}
                                <div className="absolute top-4 right-4 text-[#8a9ab0]/30 font-sora text-4xl font-bold group-hover:text-[#00d4d4]/20 transition-colors">
                                    0{idx + 1}
                                </div>

                                {/* Core Differentiator Badge */}
                                {step.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#00d4d4]/10 border border-[#00d4d4]/30 text-[#00d4d4] text-[10px] font-bold rounded-full whitespace-nowrap">
                                        {step.badge}
                                    </div>
                                )}

                                {/* Icon Box */}
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative ${step.active ? "bg-[#00d4d4]/20" : "bg-white/5 group-hover:bg-[#00d4d4]/10"
                                    }`}>
                                    {step.active && (
                                        <div className="absolute inset-0 rounded-xl border-2 border-[#00d4d4] animate-ping opacity-20" />
                                    )}
                                    <step.icon size={28} className={step.active ? "text-[#00d4d4]" : "text-white group-hover:text-[#00d4d4]"} />
                                </div>

                                <h3 className="text-xl font-sora font-semibold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-[#8a9ab0] leading-relaxed text-sm">
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
