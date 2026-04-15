"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";

const FALLBACK_CANDIDATES = [
    { id: "1", name: "David Chen", role: "Senior Frontend Engineer", score: 92, skills: ["React", "TypeScript"] },
    { id: "2", name: "Sarah Miller", role: "Full Stack Developer", score: 88, skills: ["Node.js", "Next.js"] }
];

export default function RecruiterDashboard() {
    const router = useRouter();
    const [candidates, setCandidates] = useState(FALLBACK_CANDIDATES);
    const [isLoading, setIsLoading] = useState(true);
    const [companyName, setCompanyName] = useState("Acme Corp");

    useEffect(() => {
        const role = localStorage.getItem("user_role");
        if (role !== "recruiter") {
            router.push("/");
            return;
        }

        const storedCompany = localStorage.getItem("veriq_company_name");
        if (storedCompany) {
            setCompanyName(storedCompany);
        }

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
                        skills: ["React", "TypeScript", "Node.js"]
                    }));
                    setCandidates([...mapped, ...FALLBACK_CANDIDATES].slice(0, 4));
                } catch (e) {
                    console.error("Failed to parse stored candidates", e);
                }
            }
            setIsLoading(false);
        }, 800);
    }, [router]);

    return (
        <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
            <header className="space-y-2 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00d4d4]/10 rounded-full blur-[50px] pointer-events-none" />
                <h1 className="text-3xl font-sora font-bold text-white relative z-10">{companyName} Pipeline</h1>
                <p className="text-[#8a9ab0] relative z-10">Overview of your currently verified and pending candidates.</p>
            </header>

            <DashboardMetrics />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-sora font-semibold text-white">Recent Top Matches</h2>
                    <Link href="/recruiter/candidates" className="text-sm font-medium text-[#00d4d4] hover:text-[#00e5e5] flex items-center gap-1">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center p-12">
                        <Loader2 className="w-8 h-8 text-[#00d4d4] animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {candidates.map((candidate) => (
                            <div key={candidate.id} className="bg-[#0d1722] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-[#00d4d4]/30 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-sora font-semibold text-white">
                                        {candidate.name.split(" ").map((n: string) => n[0]).join("")}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-sora font-semibold text-white group-hover:text-[#00d4d4] transition-colors">
                                            <Link href={`/recruiter/candidates/${candidate.id}`}>{candidate.name}</Link>
                                        </h3>
                                        <p className="text-sm text-[#8a9ab0]">{candidate.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t border-white/5 sm:border-t-0 pt-4 sm:pt-0">
                                    <div className="flex gap-2">
                                        {candidate.skills.slice(0, 2).map((s: string) => (
                                            <span key={s} className="px-2.5 py-1 bg-white/5 text-[#8a9ab0] text-xs font-medium rounded-lg">{s}</span>
                                        ))}
                                        {candidate.skills.length > 2 && (
                                            <span className="px-2.5 py-1 bg-white/5 text-[#8a9ab0] text-xs font-medium rounded-lg">+{candidate.skills.length - 2}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs uppercase tracking-wider text-[#8a9ab0] font-medium">Score</span>
                                        <span className="text-2xl font-sora font-bold text-green-400">{candidate.score}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
