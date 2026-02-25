"use client";
import { FileSearch, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
    return (
        <section className="py-24 bg-[#0d1722]/30 relative border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 text-[#00d4d4] text-xs font-bold tracking-widest uppercase mb-4"
                    >
                        Real-Time Insights
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-sora font-bold text-white max-w-2xl"
                    >
                        See Exactly What's Really Happening
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0d1722] border border-white/5 hover:border-[#00d4d4]/30 rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,212,212,0.1)] relative overflow-hidden"
                    >
                        <div className="absolute top-8 right-8 px-3 py-1 bg-[#00d4d4]/10 text-[#00d4d4] text-[10px] font-bold rounded-full">
                            🔥 CORE DIFFERENTIATOR
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                            <FileSearch className="text-[#00d4d4]" size={24} />
                        </div>
                        <h3 className="text-2xl font-sora font-semibold text-white mb-4">Deep AI Analysis</h3>
                        <p className="text-[#8a9ab0] leading-relaxed">
                            VeriQ doesn't just read the resume. Our AI actively cross-references past employment, skills, and project claims against multiple data sources to flag inconsistencies before the interview even starts.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#0d1722] border border-white/5 hover:border-[#00d4d4]/30 rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,212,212,0.1)] relative overflow-hidden"
                    >
                        <div className="absolute right-0 top-0 w-32 h-32 bg-[#00d4d4]/10 blur-[50px] rounded-full pointer-events-none" />
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                            <Zap className="text-[#00d4d4]" size={24} />
                        </div>
                        <h3 className="text-2xl font-sora font-semibold text-white mb-4">Timed Anti-Cheat Tests</h3>
                        <p className="text-[#8a9ab0] leading-relaxed">
                            Live skill tests generated dynamically. With exactly 10 seconds per unique multiple-choice question and zero repeats, candidates must rely on actual knowledge rather than search engines.
                        </p>
                    </motion.div>

                    {/* Full Width Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 bg-gradient-to-br from-[#0d1722] to-[#070d14] border border-[#00d4d4]/20 rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 group hover:border-[#00d4d4]/50 transition-colors shadow-[0_0_40px_rgba(0,212,212,0.05)]"
                    >
                        <div className="flex-1 space-y-6">
                            <div className="w-14 h-14 bg-[#00d4d4]/10 rounded-xl flex items-center justify-center">
                                <ShieldCheck className="text-[#00d4d4]" size={32} />
                            </div>
                            <h3 className="text-3xl font-sora font-semibold text-white">The VeriQ Trust Score</h3>
                            <p className="text-[#8a9ab0] leading-relaxed max-w-lg">
                                Stop wasting hours on technical screens. Instantly filter candidates by their Trust Score—a single, powerful metric combining resume authenticity, skill proficiency, and behavioral analysis.
                            </p>
                            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-sora font-medium rounded-full border border-white/10 transition-colors">
                                View Sample Scorecard
                            </button>
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                            {[
                                { label: "AI Accuracy", value: "94%" },
                                { label: "Timer per Q", value: "10s" },
                                { label: "Verification Steps", value: "4" },
                                { label: "Repeated Qs", value: "0" }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-[#070d14] p-6 rounded-xl border border-white/5 group-hover:border-[#00d4d4]/20 transition-colors text-center">
                                    <div className="text-3xl font-sora font-bold text-white mb-1 group-hover:text-[#00d4d4] transition-colors">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-[#8a9ab0] font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
