"use client";
import { useState } from "react";
import { Search, Filter, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { GlowCard } from "@/components/shared/GlowCard";

const MOCK_CANDIDATES = [
    { id: "can_1", name: "David Chen", role: "Senior Frontend Engineer", score: 92, match: "Excellent", skills: ["React", "TypeScript", "Next.js"] },
    { id: "can_2", name: "Sarah Miller", role: "Full Stack Developer", score: 88, match: "Strong", skills: ["Node.js", "Next.js", "PostgreSQL"] },
    { id: "can_3", name: "Michael Chang", role: "React Native Developer", score: 74, match: "Average", skills: ["React Native", "TypeScript", "Redux"] },
    { id: "can_4", name: "Elena Rodriguez", role: "Backend Engineer", score: 95, match: "Excellent", skills: ["Python", "Django", "AWS"] },
    { id: "can_5", name: "James Wilson", role: "Frontend Developer", score: 58, match: "Poor", skills: ["HTML", "CSS", "JavaScript"] },
    { id: "can_6", name: "Anita Patel", role: "UI/UX Developer", score: 82, match: "Strong", skills: ["Figma", "React", "Tailwind"] },
];

export default function BrowseCandidates() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCandidates = MOCK_CANDIDATES.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-sora font-bold text-white">Browse Verified Candidates</h1>
                    <p className="text-[#8a9ab0]">Filter and discover talent backed by Trust Scores.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-colors font-medium text-sm">
                        <Filter size={16} /> Filters
                    </button>
                </div>
            </header>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a9ab0]" size={20} />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, role, or skill..."
                    className="w-full bg-[#0d1722] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-[#8a9ab0]/50 focus:outline-none focus:border-[#00d4d4] focus:ring-1 focus:ring-[#00d4d4] transition-all shadow-sm"
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 w-full md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCandidates.map((candidate) => {

                    let scoreColor = "text-green-400 bg-green-400/10 border-green-400/20";
                    let badgeColor = "bg-green-500";
                    if (candidate.score < 60) {
                        scoreColor = "text-red-400 bg-red-400/10 border-red-400/20";
                        badgeColor = "bg-red-500";
                    } else if (candidate.score < 80) {
                        scoreColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
                        badgeColor = "bg-yellow-500";
                    }

                    return (
                        <GlowCard key={candidate.id} className="flex flex-col justify-between h-full p-6">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-sora font-bold text-white text-xl border border-white/10">
                                        {candidate.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border ${scoreColor}`}>
                                        <span className="font-sora font-bold">{candidate.score}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-sora font-semibold text-white hover:text-[#00d4d4] transition-colors">
                                    <Link href={`/recruiter/candidates/${candidate.id}`}>{candidate.name}</Link>
                                </h3>
                                <p className="text-sm text-[#8a9ab0] mb-4">{candidate.role}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {candidate.skills.slice(0, 3).map(skill => (
                                        <span key={skill} className="px-2.5 py-1 bg-[#00d4d4]/10 border border-[#00d4d4]/20 text-[#00d4d4] rounded-lg text-xs font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                    {candidate.skills.length > 3 && (
                                        <span className="px-2.5 py-1 bg-white/5 text-[#8a9ab0] rounded-lg text-xs font-medium">+{candidate.skills.length - 3}</span>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-xs font-medium text-white">
                                    <div className={`w-2 h-2 rounded-full ${badgeColor}`} />
                                    {candidate.match} Match
                                </div>
                                <Link href={`/recruiter/candidates/${candidate.id}`} className="text-sm font-semibold text-[#00d4d4] hover:text-[#00e5e5] px-4 py-2 bg-[#00d4d4]/10 rounded-xl transition-colors">
                                    View Profile
                                </Link>
                            </div>
                        </GlowCard>
                    );
                })}
            </div>

            {filteredCandidates.length === 0 && (
                <div className="text-center py-20 bg-[#0d1722] rounded-2xl border border-white/5">
                    <p className="text-[#8a9ab0]">No candidates found matching your criteria.</p>
                </div>
            )}

        </div>
    );
}
