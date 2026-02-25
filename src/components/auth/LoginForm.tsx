"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
    role: "candidate" | "recruiter";
}

export default function LoginForm({ role }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-2xl font-sora font-bold text-white">
                    Welcome back, {role === "candidate" ? "Candidate" : "Recruiter"}
                </h1>
                <p className="text-[#8a9ab0] text-sm">Sign in to your account to continue</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = `/${role}/dashboard`; }}>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#8a9ab0]">Email Address</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-[#070d14] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#8a9ab0]/50 focus:outline-none focus:border-[#00d4d4] focus:ring-1 focus:ring-[#00d4d4] transition-all"
                        required
                    />
                </div>

                <div className="space-y-1.5 relative">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-[#8a9ab0]">Password</label>
                        <Link href="#" className="text-sm text-[#00d4d4] hover:text-[#00e5e5]">Forgot Password?</Link>
                    </div>
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

                <label className="flex items-center gap-2 cursor-pointer pb-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-[#070d14] accent-[#00d4d4]" />
                    <span className="text-sm text-[#8a9ab0]">Remember me</span>
                </label>

                <button type="submit" className="w-full py-3.5 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.2)] hover:shadow-[0_0_30px_rgba(0,212,212,0.4)]">
                    Log In
                </button>
            </form>

            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#0d1722] text-[#8a9ab0]">or continue with</span>
                </div>
            </div>

            <button className="w-full py-3.5 bg-[#070d14] border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path d="M12.0003 4.75001C13.7703 4.75001 15.3553 5.36001 16.6053 6.54001L20.0303 3.11501C17.9503 1.19001 15.2353 0 12.0003 0C7.31028 0 3.25528 2.69001 1.25028 6.65001L5.30528 9.79501C6.27028 6.84001 9.00528 4.75001 12.0003 4.75001Z" fill="#EA4335" />
                    <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L20.18 21.28C22.58 19.09 24 15.93 24 12V12.275H23.49Z" fill="#4285F4" />
                    <path d="M12.0003 24.0001C15.2403 24.0001 17.9653 22.9351 20.1803 21.2801L16.0803 18.1001C14.9303 18.8951 13.5653 19.3451 12.0003 19.3451C8.98028 19.3451 6.22528 17.2451 5.27528 14.2801L1.19028 17.4401C3.21028 21.4351 7.29028 24.0001 12.0003 24.0001Z" fill="#34A853" />
                    <path d="M5.27528 14.28C5.03528 13.55 4.89528 12.79 4.89528 12C4.89528 11.21 5.03528 10.45 5.27528 9.72001L1.24528 6.57001C0.450283 8.16501 0 9.99001 0 12C0 14.01 0.450283 15.835 1.19028 17.43L5.27528 14.28Z" fill="#FBBC05" />
                </svg>
                Google
            </button>

            <p className="text-center text-sm text-[#8a9ab0] pt-4">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-[#00d4d4] font-medium hover:text-[#00e5e5] hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}
