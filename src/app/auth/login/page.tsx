"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Briefcase, Building2, ArrowLeft } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<"candidate" | "recruiter" | null>(null);

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#070d14] p-6 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d4d4]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full max-w-[480px] relative z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-full bg-[#00d4d4] font-sora font-bold text-[#070d14] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,212,212,0.4)] group-hover:scale-105 transition-transform">
                            V
                        </div>
                        <span className="font-sora text-2xl font-semibold tracking-wide text-white">
                            Veri<span className="text-[#00d4d4]">Q</span>
                        </span>
                    </Link>
                </div>

                <div className="bg-[#0d1722] rounded-3xl p-8 md:p-10 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[400px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4d4]/5 blur-[80px] rounded-full pointer-events-none" />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="relative z-10"
                            >
                                <div className="text-center mb-8">
                                    <h1 className="text-2xl font-sora font-bold text-white mb-2">Welcome Back</h1>
                                    <p className="text-sm text-[#8a9ab0]">Choose your account type to login</p>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setRole("recruiter")}
                                        className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${role === "recruiter"
                                            ? "bg-[#00d4d4]/10 border-[#00d4d4]/40 shadow-[0_0_20px_rgba(0,212,212,0.1)]"
                                            : "bg-white/5 border-white/5 hover:border-white/20"
                                            }`}
                                    >
                                        <div className={`p-3 rounded-xl ${role === 'recruiter' ? 'bg-[#00d4d4]' : 'bg-white/10'} transition-colors`}>
                                            <Building2 size={24} className={role === 'recruiter' ? 'text-[#030712]' : 'text-white'} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-1">Recruiter</h3>
                                            <p className="text-xs text-[#8a9ab0]">Login to evaluate candidates</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setRole("candidate")}
                                        className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${role === "candidate"
                                            ? "bg-[#00d4d4]/10 border-[#00d4d4]/40 shadow-[0_0_20px_rgba(0,212,212,0.1)]"
                                            : "bg-white/5 border-white/5 hover:border-white/20"
                                            }`}
                                    >
                                        <div className={`p-3 rounded-xl ${role === 'candidate' ? 'bg-[#00d4d4]' : 'bg-white/10'} transition-colors`}>
                                            <Briefcase size={24} className={role === 'candidate' ? 'text-[#030712]' : 'text-white'} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white mb-1">Candidate</h3>
                                            <p className="text-xs text-[#8a9ab0]">Login to take skill tests</p>
                                        </div>
                                    </button>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!role}
                                    className="w-full mt-8 py-4 bg-[#00d4d4] text-[#030712] font-semibold rounded-xl transition-all hover:bg-[#00e5e5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Continue to Login <ChevronRight size={18} />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && role && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="relative z-10"
                            >
                                <button 
                                    onClick={() => setStep(1)} 
                                    className="flex items-center gap-2 text-[#8a9ab0] hover:text-white text-sm mb-6 transition-colors"
                                >
                                    <ArrowLeft size={16} /> Back to roles
                                </button>
                                <LoginForm role={role} key={role} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
