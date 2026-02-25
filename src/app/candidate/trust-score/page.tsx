"use client";
import { ShieldCheck, Share2, Download, CheckCircle2, ChevronRight } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";

export default function TrustScore() {
    const score = 87;

    // SVG math
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">

            <header className="space-y-4 text-center">
                <h1 className="text-3xl md:text-4xl font-sora font-bold text-white">Your VeriQ Trust Score</h1>
                <p className="text-[#8a9ab0] max-w-2xl mx-auto">This score represents your verified profile authenticity and technical capability, calculated by AI and timed MCQ tests.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Score Card */}
                <GlowCard className="lg:col-span-1 flex flex-col items-center justify-center text-center p-10" active>
                    <div className="relative w-48 h-48 flex items-center justify-center bg-white/5 rounded-full shadow-[0_0_50px_rgba(0,212,212,0.1)] mb-6">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="96" cy="96" r={radius} className="stroke-white/5" strokeWidth="12" fill="none" />
                            <circle
                                cx="96"
                                cy="96"
                                r={radius}
                                className="stroke-[#00d4d4]"
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                            />
                        </svg>
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="text-6xl font-sora font-bold text-white">{score}</span>
                            <span className="text-[#00d4d4] font-medium tracking-widest text-sm uppercase">Excellent</span>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 text-sm font-semibold mb-6">
                        <ShieldCheck size={16} /> Top 15% of Candidates
                    </div>

                    <p className="text-[#8a9ab0] text-sm leading-relaxed mb-8">
                        Verified on Feb 25, 2026. This score is mathematically backed by your verified work history and 4 technical assessments.
                    </p>

                    <div className="w-full flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.2)]">
                            <Share2 size={18} /> Share
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center shrink-0 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-colors">
                            <Download size={18} />
                        </button>
                    </div>
                </GlowCard>

                {/* Breakdown Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-sora font-semibold text-white mb-6">Score Breakdown</h2>

                    <div className="space-y-8">
                        {[
                            { label: "Resume Authenticity", value: 94, desc: "AI timeline cross-referencing and claim validation." },
                            { label: "Skill Accuracy (Tests)", value: 82, desc: "Average score across technical timed modules." },
                            { label: "Profile Completeness", value: 100, desc: "All required documentation and history provided." }
                        ].map((metric, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-white font-medium">{metric.label}</h3>
                                        <p className="text-sm text-[#8a9ab0]">{metric.desc}</p>
                                    </div>
                                    <span className="text-[#00d4d4] font-sora font-bold">{metric.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#0d1722] rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-[#00d4d4]"
                                        style={{ width: `${metric.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 p-6 bg-[#0d1722] border border-white/5 rounded-2xl">
                        <h3 className="text-white font-medium mb-4">Verified Technical Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {["React (Passed)", "TypeScript (Passed)", "Next.js (Passed)", "Node.js (Pending)"].map((skill, i) => {
                                const isPassed = skill.includes("Passed");
                                return (
                                    <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border ${isPassed ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-white/5 border-white/10 text-[#8a9ab0]"
                                        }`}>
                                        {isPassed && <CheckCircle2 size={14} />}
                                        {skill.replace(/ \(.+\)/, "")}
                                    </div>
                                );
                            })}
                        </div>
                        <button className="mt-6 flex items-center gap-2 text-[#00d4d4] text-sm font-medium hover:text-[#00e5e5] transition-colors rounded-xl p-2 hover:bg-white/5 -ml-2">
                            Take pending skill tests to improve score <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
