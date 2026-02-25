"use client";
import { useState } from "react";
import Link from "next/link";
import RoleToggle from "@/components/auth/RoleToggle";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    const [role, setRole] = useState<"candidate" | "recruiter">("candidate");

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

                <div className="bg-[#0d1722] rounded-3xl p-8 md:p-10 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4d4]/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <RoleToggle role={role} onChange={setRole} />
                        <LoginForm role={role} key={role} />
                    </div>
                </div>
            </div>
        </main>
    );
}
