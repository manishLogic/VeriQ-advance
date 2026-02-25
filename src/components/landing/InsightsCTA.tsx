"use client";
import { motion } from "framer-motion";

export default function InsightsCTA() {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0d1722] rounded-3xl p-8 md:p-16 border border-white/5 relative overflow-hidden group hover:border-[#00d4d4]/30 transition-colors duration-500 shadow-2xl"
            >
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00d4d4]/10 blur-[100px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-[#00d4d4]/20" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-sora font-bold text-white leading-tight">
                            Ready to hire with <span className="text-[#00d4d4]">absolute certainty?</span>
                        </h2>
                        <p className="text-[#8a9ab0] text-lg max-w-lg leading-relaxed">
                            Stop guessing on candidate capabilities. Start knowing with real-time, AI-validated skill tests that eliminate fraud.
                        </p>
                        <button className="px-8 py-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,212,212,0.4)] mt-4">
                            Get Started Free
                        </button>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                        {[
                            { label: "Unique Questions", value: "∞" },
                            { label: "Powered", value: "AI" },
                            { label: "Trust Score", value: "1" },
                            { label: "Insights", value: "Live" }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-[#070d14]/50 backdrop-blur-sm p-6 rounded-xl border border-white/5 group-hover:border-[#00d4d4]/10 transition-colors text-center">
                                <div className="text-4xl font-sora font-bold text-white mb-2 group-hover:text-[#00d4d4] transition-colors">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-inter text-[#8a9ab0] font-medium uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
