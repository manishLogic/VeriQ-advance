"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

interface LoginFormProps {
    role: "candidate" | "recruiter";
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as any }
    }
};

export default function LoginForm({ role }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <motion.div variants={itemVariants} className="text-center space-y-2 mb-8">
                <h1 className="text-2xl font-sora font-bold text-white">
                    Welcome back, {role === "candidate" ? "Candidate" : "Recruiter"}
                </h1>
                <p className="text-[#8a9ab0] text-sm">Sign in to your account to continue</p>
            </motion.div>

            <form className="space-y-5" onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem("user_role", role);
                localStorage.setItem("user_email", email);
                window.location.href = `/${role}/dashboard`;
            }}>
                <motion.div variants={itemVariants} className="relative group">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-4 pt-6 pb-2 text-white bg-[#070d14]/50 hover:bg-[#070d14] border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-[#00d4d4] peer transition-all duration-300"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="email" className="absolute text-sm text-[#8a9ab0] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#00d4d4] pointer-events-none">
                        Email Address
                    </label>
                </motion.div>

                <motion.div variants={itemVariants} className="relative group">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="block w-full px-4 pt-6 pb-2 text-white bg-[#070d14]/50 hover:bg-[#070d14] border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-[#00d4d4] peer transition-all duration-300 pr-12"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="password" className="absolute text-sm text-[#8a9ab0] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#00d4d4] pointer-events-none">
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a9ab0] hover:text-[#00d4d4] transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <div className="absolute right-0 -bottom-6 text-sm">
                        <Link href="#" className="text-[#00d4d4] hover:text-[#00e5e5] transition-colors decoration-[#00d4d4]/30 hover:underline underline-offset-4">
                            Forgot Password?
                        </Link>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4 flex items-center justify-between pb-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-[#070d14] group-hover:border-[#00d4d4]/50 transition-colors">
                            <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                            <div className="pointer-events-none peer-checked:bg-[#00d4d4] absolute inset-0 rounded transition-colors" />
                            <svg className="w-3.5 h-3.5 text-black absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="text-sm text-[#8a9ab0] group-hover:text-white transition-colors">Remember me</span>
                    </label>
                </motion.div>

                <motion.button
                    variants={itemVariants}
                    type="submit"
                    className="w-full py-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.2)] hover:shadow-[0_0_30px_rgba(0,212,212,0.4)]"
                >
                    Sign In to Dashboard
                </motion.button>
            </form>

            <motion.div variants={itemVariants} className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#0d1722] text-[#8a9ab0]">or continue with</span>
                </div>
            </motion.div>

            <motion.button 
                variants={itemVariants} 
                type="button"
                onClick={() => {
                    localStorage.setItem("user_role", role);
                    localStorage.setItem("user_email", "guest@google.com");
                    window.location.href = `/${role}/dashboard`;
                }}
                className="w-full py-3.5 bg-[#070d14] border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
            >
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path d="M12.0003 4.75001C13.7703 4.75001 15.3553 5.36001 16.6053 6.54001L20.0303 3.11501C17.9503 1.19001 15.2353 0 12.0003 0C7.31028 0 3.25528 2.69001 1.25028 6.65001L5.30528 9.79501C6.27028 6.84001 9.00528 4.75001 12.0003 4.75001Z" fill="#EA4335" />
                    <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L20.18 21.28C22.58 19.09 24 15.93 24 12V12.275H23.49Z" fill="#4285F4" />
                    <path d="M12.0003 24.0001C15.2403 24.0001 17.9653 22.9351 20.1803 21.2801L16.0803 18.1001C14.9303 18.8951 13.5653 19.3451 12.0003 19.3451C8.98028 19.3451 6.22528 17.2451 5.27528 14.2801L1.19028 17.4401C3.21028 21.4351 7.29028 24.0001 12.0003 24.0001Z" fill="#34A853" />
                    <path d="M5.27528 14.28C5.03528 13.55 4.89528 12.79 4.89528 12C4.89528 11.21 5.03528 10.45 5.27528 9.72001L1.24528 6.57001C0.450283 8.16501 0 9.99001 0 12C0 14.01 0.450283 15.835 1.19028 17.43L5.27528 14.28Z" fill="#FBBC05" />
                </svg>
                Google
            </motion.button>

            <motion.p variants={itemVariants} className="text-center text-sm text-[#8a9ab0] pt-4">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-[#00d4d4] font-medium hover:text-[#00e5e5] hover:underline">
                    Sign Up
                </Link>
            </motion.p>
        </motion.div>
    );
}
