"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
    role: "candidate" | "recruiter";
}

export default function RegisterForm({ role }: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-2xl font-sora font-bold text-white">
                    Create {role === "candidate" ? "Candidate" : "Recruiter"} Account
                </h1>
                <p className="text-[#8a9ab0] text-sm">Join VeriQ and build verified trust</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = `/${role}/dashboard`; }}>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#8a9ab0]">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-[#070d14] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#8a9ab0]/50 focus:outline-none focus:border-[#00d4d4] focus:ring-1 focus:ring-[#00d4d4] transition-all"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#8a9ab0]">Email Address</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-[#070d14] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#8a9ab0]/50 focus:outline-none focus:border-[#00d4d4] focus:ring-1 focus:ring-[#00d4d4] transition-all"
                        required
                    />
                </div>

                {/* Dynamic Fields based on Role */}
                {role === "candidate" ? (
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#8a9ab0]">Primary Role / Job Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Senior Frontend Engineer"
                            className="w-full bg-[#070d14] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#8a9ab0]/50 focus:outline-none focus:border-[#00d4d4] focus:ring-1 focus:ring-[#00d4d4] transition-all"
                            required
                        />
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#8a9ab0]">Company Name</label>
                        <input
                            type="text"
                            placeholder="Acme Corp"
                            className="w-full bg-[#070d14] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#8a9ab0]/50 focus:outline-none focus:border-[#00d4d4] focus:ring-1 focus:ring-[#00d4d4] transition-all"
                            required
                        />
                    </div>
                )}

                <div className="space-y-1.5 relative pt-2">
                    <label className="text-sm font-medium text-[#8a9ab0]">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-[#070d14] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#8a9ab0]/50 focus:outline-none focus:border-[#00d4d4] focus:ring-1 focus:ring-[#00d4d4] transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a9ab0] hover:text-white"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer py-2">
                    <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-white/10 bg-[#070d14] accent-[#00d4d4]" required />
                    <span className="text-xs text-[#8a9ab0] leading-snug">
                        I agree to the <Link href="#" className="text-white hover:text-[#00d4d4] underline decoration-white/20 hover:decoration-[#00d4d4]">Terms of Service</Link> and <Link href="#" className="text-white hover:text-[#00d4d4] underline decoration-white/20 hover:decoration-[#00d4d4]">Privacy Policy</Link>
                    </span>
                </label>

                <button type="submit" className="w-full py-3.5 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.2)] hover:shadow-[0_0_30px_rgba(0,212,212,0.4)]">
                    Create Account
                </button>
            </form>

            <p className="text-center text-sm text-[#8a9ab0] pt-4">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#00d4d4] font-medium hover:text-[#00e5e5] hover:underline">
                    Log In
                </Link>
            </p>
        </div>
    );
}
