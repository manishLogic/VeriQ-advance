"use client";
import { ArrowLeft, Download, ShieldCheck, Mail, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { GlowCard } from "@/components/shared/GlowCard";

export default function CandidateProfile() {
    const candidate = {
        name: "David Chen",
        role: "Senior Frontend Engineer",
        location: "San Francisco, CA (Remote)",
        experience: "8 Years",
        score: 92,
        match: "Excellent",
        about: "Senior Frontend Engineer with a proven track record of architecting scalable React applications. Passionate about web performance and accessible UI components.",
        skills: [
            { name: "React", score: 98, status: "Passed" },
            { name: "TypeScript", score: 94, status: "Passed" },
            { name: "Next.js", score: 88, status: "Passed" },
            { name: "GraphQL", score: 85, status: "Passed" }
        ]
    };

    // SVG math
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (candidate.score / 100) * circumference;

    return (
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Navigation */}
            <Link href="/recruiter/candidates" className="inline-flex items-center gap-2 text-[#8a9ab0] hover:text-white transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Back to Candidates
            </Link>

            {/* Header Profile Card */}
            <div className="bg-[#0d1722] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#00d4d4]/5 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
                    <div className="flex gap-6 items-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-sora font-bold text-white text-3xl border border-white/10 shadow-lg shrink-0">
                            {candidate.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-sora font-bold text-white">{candidate.name}</h1>
                            <p className="text-lg text-[#00d4d4] font-medium">{candidate.role}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-[#8a9ab0] pt-1">
                                <span className="flex items-center gap-1.5"><MapPin size={16} /> {candidate.location}</span>
                                <span className="flex items-center gap-1.5"><Calendar size={16} /> {candidate.experience}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button className="w-full md:w-48 py-3 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.2)] flex items-center justify-center gap-2">
                            <Mail size={18} /> Invite to Interview
                        </button>
                        <button className="w-full md:w-48 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                            <Download size={18} /> Download Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-xl font-sora font-semibold text-white">About Candidate</h2>
                        <p className="text-[#8a9ab0] leading-relaxed">{candidate.about}</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-sora font-semibold text-white">Verified Skill Tests</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {candidate.skills.map(skill => (
                                <div key={skill.name} className="bg-[#0d1722] border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:border-[#00d4d4]/20 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-medium text-white">{skill.name}</span>
                                        <span className="text-green-400 bg-green-400/10 px-2 py-0.5 rounded text-xs font-bold border border-green-400/20 flex items-center gap-1">
                                            <CheckCircle2 size={12} /> {skill.status}
                                        </span>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <span className="text-sm text-[#8a9ab0]">Test Score</span>
                                        <span className="font-sora font-bold text-white">{skill.score}/100</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-[#070d14] rounded-full overflow-hidden mt-3">
                                        <div
                                            className="h-full bg-[#00d4d4]"
                                            style={{ width: `${skill.score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Trust Score */}
                <div className="lg:col-span-1">
                    <GlowCard className="flex flex-col items-center justify-center text-center p-8 sticky top-8" active>
                        <h3 className="font-sora font-semibold text-white mb-6">VeriQ Trust Score</h3>

                        <div className="relative w-32 h-32 flex items-center justify-center bg-[#070d14] rounded-full shadow-inner mb-6 border border-white/5">
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="64" cy="64" r={radius} className="stroke-white/5" strokeWidth="8" fill="none" />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r={radius}
                                    className="stroke-green-400"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                                />
                            </svg>
                            <div className="relative z-10 flex flex-col items-center">
                                <span className="text-4xl font-sora font-bold text-white">{candidate.score}</span>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 text-xs font-bold uppercase tracking-wider mb-6">
                            <ShieldCheck size={14} /> {candidate.match} Match
                        </div>

                        <div className="w-full space-y-4 text-left">
                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                <span className="text-[#8a9ab0]">Resume Authenticity</span>
                                <span className="text-white font-medium">96%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                <span className="text-[#8a9ab0]">Overall Skill Avg</span>
                                <span className="text-white font-medium">91%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8a9ab0]">Identity Verification</span>
                                <span className="text-green-400 font-medium flex items-center gap-1"><CheckCircle2 size={14} /> Verified</span>
                            </div>
                        </div>
                    </GlowCard>
                </div>

            </div>
        </div>
    );
}
