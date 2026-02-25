"use client";
import Link from "next/link";
import RegistrationFlow from "@/components/auth/RegistrationFlow";

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#030712] p-6 relative overflow-hidden pt-12 pb-20">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d4d4]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full max-w-[500px] relative z-10 flex flex-col pt-8">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-[#00d4d4] font-sora font-bold text-[#030712] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,212,212,0.4)] group-hover:scale-105 transition-transform">
                            V
                        </div>
                        <span className="font-sora text-2xl font-semibold tracking-wide text-white">
                            Veri<span className="text-[#00d4d4]">Q</span>
                        </span>
                    </Link>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-[#00d4d4]/5 blur-[80px] rounded-full pointer-events-none z-0" />

                    <RegistrationFlow />

                </div>

                <div className="text-center mt-12 text-[#8a9ab0] text-sm z-10">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-[#00d4d4] font-medium hover:text-[#00e5e5] hover:underline underline-offset-4 decoration-[#00d4d4]/30">
                        Log In Here
                    </Link>
                </div>
            </div>
        </main>
    );
}
