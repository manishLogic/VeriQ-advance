"use client";

import { useState, useEffect } from "react";
import { Award, Target, FileText, Zap } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function CandidateDashboard() {
    const { user, isLoaded: isClerkLoaded } = useUser();
    const [localName, setLocalName] = useState("Candidate");
    const [hasSkills, setHasSkills] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        let initialName = "Candidate";
        
        // Try to get name from registration session first
        const sessionData = localStorage.getItem("veriq_session");
        if (sessionData) {
            try {
                const parsed = JSON.parse(sessionData);
                if (parsed.fullName) {
                    initialName = parsed.fullName.split(' ')[0]; // Just use first name
                }
            } catch (e) {}
        }
        
        // Fallback to email if no session name is found
        if (initialName === "Candidate") {
            const storedEmail = localStorage.getItem("user_email");
            if (storedEmail && storedEmail !== "guest@google.com") {
                initialName = storedEmail.split('@')[0];
            } else if (storedEmail === "guest@google.com") {
                initialName = "Guest";
            }
        }
        
        setLocalName(initialName);
        
        const skillsObj = localStorage.getItem("veriq_skills");
        if (skillsObj && JSON.parse(skillsObj).length > 0) {
            setHasSkills(true);
        }
    }, []);

    if (!mounted || !isClerkLoaded) return null;

    const displayName = user?.fullName || user?.firstName || localName;

    return (
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">

            <header className="space-y-2">
                <h1 className="text-3xl font-sora font-bold text-white">
                    {hasSkills ? "Welcome back," : "Welcome,"} <span className="capitalize">{displayName}</span> 👋
                </h1>
                <p className="text-[#8a9ab0]">
                    {!hasSkills ? "Let's get your profile verified to stand out to top tech companies." : "Here's what's happening with your verified profile."}
                </p>
            </header>

            {!hasSkills ? (
                /* NEW USER EMPTY STATE */
                <div className="bg-[#0b1120] border border-white/10 rounded-3xl p-10 md:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00d4d4]/5 blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10 w-24 h-24 mx-auto bg-[#00d4d4]/10 rounded-full flex items-center justify-center border border-[#00d4d4]/30 shadow-[0_0_30px_rgba(0,212,212,0.2)]">
                        <FileText size={40} className="text-[#00d4d4]" />
                    </div>
                    
                    <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-sora font-bold text-white">Extract Your Skills to Begin</h2>
                        <p className="text-[#8a9ab0] text-lg leading-relaxed">
                            Upload your resume so our AI can instantly extract your exact technical stack and suggest verified skill tests to build your VeriQ Trust Score.
                        </p>
                    </div>

                    <div className="relative z-10 pt-4">
                        <Link 
                            href="/candidate/upload" 
                            className="inline-flex px-8 py-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.3)] hover:shadow-[0_0_30px_rgba(0,212,212,0.5)] items-center gap-3"
                        >
                            Upload Resume Now <Zap size={18} />
                        </Link>
                    </div>
                </div>
            ) : (
                /* EXPERIENCED USER DASHBOARD */
                <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
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
            )}

        </div>
    );
}
