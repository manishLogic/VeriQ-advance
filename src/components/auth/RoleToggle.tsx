"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface RoleToggleProps {
    role: "candidate" | "recruiter";
    onChange: (role: "candidate" | "recruiter") => void;
}

export default function RoleToggle({ role, onChange }: RoleToggleProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedRole = localStorage.getItem("veriq_role") as "candidate" | "recruiter";
        if (storedRole && (storedRole === "candidate" || storedRole === "recruiter")) {
            onChange(storedRole);
        }
    }, [onChange]);

    const handleToggle = (newRole: "candidate" | "recruiter") => {
        onChange(newRole);
        localStorage.setItem("veriq_role", newRole);
    };

    // Hydration check
    if (!mounted) return <div className="h-[80px]" />;

    return (
        <div className="w-full flex justify-center flex-col items-center mb-6">
            <div className="relative w-full sm:w-[320px] h-[44px] bg-[#0b1120]/60 backdrop-blur-xl rounded-[999px] p-1 border border-white/5 flex isolate overflow-hidden">
                <button
                    onClick={() => handleToggle("candidate")}
                    className={`relative z-10 flex-1 flex items-center justify-center rounded-[999px] text-[14px] font-medium tracking-tight transition-colors duration-250 ${role === "candidate" ? "text-[#030712]" : "text-[#8a9ab0] hover:bg-white/5"
                        }`}
                >
                    Candidate
                    {role === "candidate" && (
                        <motion.div
                            layoutId="activeRoleSegment"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="absolute inset-0 bg-gradient-to-b from-[#00e5e5] to-[#00d4d4] rounded-[999px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.2)] -z-10"
                        />
                    )}
                </button>

                <button
                    onClick={() => handleToggle("recruiter")}
                    className={`relative z-10 flex-1 flex items-center justify-center rounded-[999px] text-[14px] font-medium tracking-tight transition-colors duration-250 ${role === "recruiter" ? "text-[#030712]" : "text-[#8a9ab0] hover:bg-white/5"
                        }`}
                >
                    Recruiter
                    {role === "recruiter" && (
                        <motion.div
                            layoutId="activeRoleSegment"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="absolute inset-0 bg-gradient-to-b from-[#00e5e5] to-[#00d4d4] rounded-[999px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.2)] -z-10"
                        />
                    )}
                </button>
            </div>

            <div className="relative h-6 mt-4 w-full">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={role}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center text-xs text-[#8a9ab0]"
                    >
                        {role === "candidate" ? "Showcase your verified skills." : "Access validated technical talent."}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}
