"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

export const RippleButton = ({ children, variant = "primary", className = "", ...props }: RippleButtonProps) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { x, y, id: Date.now() };

        setRipples((prev) => [...prev, newRipple]);

        // Clean up ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
    };

    const baseStyle = "relative overflow-hidden font-sora font-semibold rounded-xl transition-all flex items-center justify-center gap-2 px-6 py-3";

    const variants = {
        primary: "bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] shadow-[0_0_20px_rgba(0,212,212,0.2)] hover:shadow-[0_0_30px_rgba(0,212,212,0.4)]",
        secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10",
        outline: "bg-transparent hover:bg-[#00d4d4]/10 text-[#00d4d4] border border-[#00d4d4]/30 hover:border-[#00d4d4]/60"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={(e) => {
                addRipple(e);
                props.onClick?.(e);
            }}
            {...props}
        >
            <AnimatePresence>
                {ripples.map((rip) => (
                    <motion.span
                        key={rip.id}
                        initial={{ opacity: 0.5, scale: 0 }}
                        animate={{ opacity: 0, scale: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`absolute rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 ${variant === 'primary' ? 'bg-white' : 'bg-[#00d4d4]'
                            }`}
                        style={{ left: rip.x, top: rip.y }}
                    />
                ))}
            </AnimatePresence>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    );
};
