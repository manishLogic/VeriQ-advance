"use client";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d4d4]/15 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[#00d4d4]/40 bg-[#00d4d4]/5 text-[#00d4d4] text-xs sm:text-sm font-bold tracking-widest uppercase"
                >
                    The only resume verification platform with live skill validation
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-sora font-bold text-white leading-tight"
                >
                    Verify Skills. Build <span className="text-[#00d4d4] drop-shadow-[0_0_30px_rgba(0,212,212,0.3)]">Trust.</span> Hire Smart.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-[#8a9ab0] max-w-2xl mx-auto leading-relaxed"
                >
                    Stop guessing. Start knowing. VeriQ combines instant resume parsing with live, timed skill tests to give you absolute confidence in every candidate.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <button className="w-full sm:w-auto px-8 py-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,212,212,0.4)]">
                        Get Started
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-[#00d4d4]/50 hover:bg-[#00d4d4]/5 text-white font-sora font-semibold rounded-full transition-all">
                        See How It Works
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
