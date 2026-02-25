import { Award, Target, FileText, Zap } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import Link from "next/link";

export default function CandidateDashboard() {
    return (
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">

            <header className="space-y-2">
                <h1 className="text-3xl font-sora font-bold text-white">Welcome back, John 👋</h1>
                <p className="text-[#8a9ab0]">Here's what's happening with your verified profile.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlowCard className="flex flex-col justify-between" active>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/5 rounded-xl text-[#00d4d4]">
                            <Award size={24} />
                        </div>
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                            TOP 15%
                        </span>
                    </div>
                    <div>
                        <h3 className="text-[#8a9ab0] font-medium mb-1">VeriQ Trust Score</h3>
                        <div className="text-4xl font-sora font-bold text-white">87<span className="text-2xl text-[#8a9ab0] font-medium">/100</span></div>
                    </div>
                </GlowCard>

                <GlowCard className="flex flex-col justify-between">
                    <div className="p-3 bg-white/5 rounded-xl text-white w-max mb-4">
                        <Target size={24} />
                    </div>
                    <div>
                        <h3 className="text-[#8a9ab0] font-medium mb-1">Skills Verified</h3>
                        <div className="text-4xl font-sora font-bold text-white">4</div>
                    </div>
                </GlowCard>

                <GlowCard className="flex flex-col justify-between">
                    <div className="p-3 bg-white/5 rounded-xl text-white w-max mb-4">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h3 className="text-[#8a9ab0] font-medium mb-1">Resumes Analyzed</h3>
                        <div className="text-4xl font-sora font-bold text-white">1</div>
                    </div>
                </GlowCard>
            </div>

            {/* Action CTA */}
            <div className="bg-gradient-to-r from-[#00d4d4]/10 to-transparent border border-[#00d4d4]/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#0d1722] to-transparent pointer-events-none" />

                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-[#00d4d4]/10 flex items-center justify-center border border-[#00d4d4]/30">
                        <Zap className="text-[#00d4d4]" size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-sora font-semibold text-white mb-2">Boost Your Score</h3>
                        <p className="text-[#8a9ab0] max-w-sm">Complete your pending React testing module to increase your Trust Score to 90+.</p>
                    </div>
                </div>

                <Link href="/candidate/skill-test" className="relative z-10 shrink-0 px-8 py-3.5 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.2)]">
                    Start Test Now
                </Link>
            </div>

        </div>
    );
}
