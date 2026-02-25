"use client";
import { motion } from "framer-motion";

interface RoleToggleProps {
    role: "candidate" | "recruiter";
    onChange: (role: "candidate" | "recruiter") => void;
}

export default function RoleToggle({ role, onChange }: RoleToggleProps) {
    return (
        <div className="flex items-center justify-center p-1 bg-white/5 rounded-full border border-white/10 mb-8 relative w-max mx-auto">
            <button
                onClick={() => onChange("candidate")}
                className={`relative z-10 px-6 py-2 rounded-full font-sora text-sm font-semibold transition-colors ${role === "candidate" ? "text-[#070d14]" : "text-[#8a9ab0] hover:text-white"
                    }`}
            >
                Candidate
            </button>
            <button
                onClick={() => onChange("recruiter")}
                className={`relative z-10 px-6 py-2 rounded-full font-sora text-sm font-semibold transition-colors ${role === "recruiter" ? "text-[#070d14]" : "text-[#8a9ab0] hover:text-white"
                    }`}
            >
                Recruiter
            </button>

            {/* Animated Background Pill */}
            <motion.div
                className="absolute top-1 bottom-1 w-[120px] bg-[#00d4d4] rounded-full z-0 shadow-[0_0_15px_rgba(0,212,212,0.4)]"
                initial={false}
                animate={{
                    x: role === "candidate" ? 4 : 124
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
        </div>
    );
}
