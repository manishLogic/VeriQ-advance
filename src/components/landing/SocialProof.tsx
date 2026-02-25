"use client";
import { motion } from "framer-motion";

export default function SocialProof() {
    return (
        <section className="py-12 border-y border-white/5 bg-[#0b1120]/50 relative overflow-hidden">
            {/* Subtle top/bottom edge highlights */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00d4d4]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00d4d4]/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">

                {/* Stripe-like Metrics Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/10"
                >
                    {/* Background decorative gradient mesh for the metrics card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00d4d4]/5 via-transparent to-[#0088cc]/5 pointer-events-none" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10 divide-x-0 md:divide-x divide-white/10">

                        <div className="text-center px-4">
                            <h4 className="text-4xl md:text-5xl font-bold font-sora text-white mb-2 tracking-tighter">94<span className="text-[#00d4d4]">%</span></h4>
                            <p className="text-sm font-medium text-[#8a9ab0] uppercase tracking-wide">AI Accuracy</p>
                        </div>

                        <div className="text-center px-4">
                            <h4 className="text-4xl md:text-5xl font-bold font-sora text-white mb-2 tracking-tighter">10<span className="text-[#00d4d4]">s</span></h4>
                            <p className="text-sm font-medium text-[#8a9ab0] uppercase tracking-wide">Per Question</p>
                        </div>

                        <div className="text-center px-4">
                            <h4 className="text-4xl md:text-5xl font-bold font-sora text-white mb-2 tracking-tighter">4</h4>
                            <p className="text-sm font-medium text-[#8a9ab0] uppercase tracking-wide">Validation Layers</p>
                        </div>

                        <div className="text-center px-4">
                            <h4 className="text-4xl md:text-5xl font-bold font-sora text-white mb-2 tracking-tighter">0</h4>
                            <p className="text-sm font-medium text-[#8a9ab0] uppercase tracking-wide">Repeat Questions</p>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
