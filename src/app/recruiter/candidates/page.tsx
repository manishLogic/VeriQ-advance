"use client";
import { useState, useEffect } from "react";
import { Search, Filter, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { GlowCard } from "@/components/shared/GlowCard";

const FALLBACK_CANDIDATES = [
    { id: "can_1", name: "David Chen", role: "Senior Frontend Engineer", score: 92, match: "Excellent", skills: ["React", "TypeScript", "Next.js"], hasAttemptedTest: true },
    { id: "can_2", name: "Sarah Miller", role: "Full Stack Developer", score: 88, match: "Strong", skills: ["Node.js", "Next.js", "PostgreSQL"], hasAttemptedTest: true },
    { id: "can_3", name: "Michael Chang", role: "React Native Developer", score: null, match: "Pending", skills: ["React Native", "TypeScript", "Redux"], hasAttemptedTest: false },
    { id: "can_4", name: "Elena Rodriguez", role: "Backend Engineer", score: 95, match: "Excellent", skills: ["Python", "Django", "AWS"], hasAttemptedTest: true },
    { id: "can_5", name: "James Smith", role: "Full Stack Developer", score: null, match: "Pending", skills: ["Java", "Spring Boot", "React"], hasAttemptedTest: false },
];

export default function BrowseCandidates() {
    const [searchTerm, setSearchTerm] = useState("");
    const [candidates, setCandidates] = useState(FALLBACK_CANDIDATES);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate network delay
        setTimeout(() => {
            const stored = localStorage.getItem("veriq_mock_candidates");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    const mapped = parsed.map((p: any) => ({
                        id: p.id.toString(),
                        name: p.name,
                        role: p.role,
                        score: p.score,
                        match: p.score ? (p.score > 90 ? "Excellent" : p.score > 80 ? "Strong" : "Average") : "Pending",
                        skills: ["React", "TypeScript", "Node.js"],
                        hasAttemptedTest: !!p.score
                    }));
                    setCandidates([...mapped, ...FALLBACK_CANDIDATES]);
                } catch (e) {
                    console.error("Failed to parse stored candidates", e);
                }
            }
            setIsLoading(false);
        }, 800);
    }, []);

    const filteredCandidates = candidates.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-sora font-bold text-white">All Candidates</h1>
                    <p className="text-[#8a9ab0]">A complete list of registered candidates. View their profile or test status.</p>
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

            {/* List */}
            <div className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-[#0b1120] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row justify-between animate-pulse">
                            <div className="flex gap-4">
                                <div className="w-14 h-14 rounded-full bg-white/5" />
                                <div>
                                    <div className="h-6 w-32 bg-white/5 rounded-md mb-2" />
                                    <div className="h-4 w-48 bg-white/5 rounded-md" />
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 flex flex-col items-end">
                                <div className="h-6 w-20 bg-white/5 rounded-md mb-2" />
                                <div className="h-8 w-24 bg-white/5 rounded-xl" />
                            </div>
                        </div>
                    ))
                ) : (
                    filteredCandidates.map((candidate) => {
                        let scoreColor = "text-[#8a9ab0] bg-white/5 border-white/10";
                        let badgeColor = "bg-[#8a9ab0]";
                        
                        if (candidate.hasAttemptedTest && candidate.score !== null) {
                            if (candidate.score < 60) {
                                scoreColor = "text-red-400 bg-red-400/10 border-red-400/20";
                                badgeColor = "bg-red-500";
                            } else if (candidate.score < 80) {
                                scoreColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
                                badgeColor = "bg-yellow-500";
                            } else {
                                scoreColor = "text-green-400 bg-green-400/10 border-green-400/20";
                                badgeColor = "bg-green-500";
                            }
                        }

                        return (
                            <GlowCard key={candidate.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 w-full">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-sora font-bold text-white text-xl border border-white/10">
                                        {candidate.name.split(" ").map((n: string) => n[0]).join("")}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-sora font-semibold text-white hover:text-[#00d4d4] transition-colors">
                                            <Link href={`/recruiter/candidates/${candidate.id}`}>{candidate.name}</Link>
                                        </h3>
                                        <p className="text-sm text-[#8a9ab0] mb-2">{candidate.role}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {candidate.skills.slice(0, 3).map((skill: string) => (
                                                <span key={skill} className="px-2.5 py-1 bg-[#00d4d4]/10 border border-[#00d4d4]/20 text-[#00d4d4] rounded-lg text-xs font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                            {candidate.skills.length > 3 && (
                                                <span className="px-2.5 py-1 bg-white/5 text-[#8a9ab0] rounded-lg text-xs font-medium">+{candidate.skills.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 mt-6 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-white mb-2">
                                            <div className={`w-2 h-2 rounded-full ${badgeColor}`} />
                                            {candidate.hasAttemptedTest ? `${candidate.match} Match` : "Test Pending"}
                                        </div>
                                        <div className={`flex items-center justify-center px-4 py-2 rounded-xl border ${scoreColor}`}>
                                            <span className="font-sora font-bold text-sm">
                                                {candidate.hasAttemptedTest ? `Score: ${candidate.score}` : "No Score"}
                                            </span>
                                        </div>
                                    </div>
                                    <Link href={`/recruiter/candidates/${candidate.id}`} className="text-sm font-semibold text-[#00d4d4] hover:text-[#00e5e5] px-4 py-2 bg-[#00d4d4]/10 rounded-xl transition-colors whitespace-nowrap">
                                        View Profile
                                    </Link>
                                </div>
                            </GlowCard>
                        );
                    })
                )}
            </div>

            {!isLoading && filteredCandidates.length === 0 && (
                <div className="text-center py-20 bg-[#0d1722] rounded-2xl border border-white/5">
                    <p className="text-[#8a9ab0]">No candidates found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
