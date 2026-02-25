"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
    glowColor?: "cyan" | "default";
    active?: boolean;
}

export const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(
    ({ className, children, glowColor = "cyan", active = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-[#0d1722] border rounded-2xl p-6 md:p-8 transition-all duration-300 relative group overflow-hidden",
                    active
                        ? "border-[#00d4d4]/50 shadow-[0_0_30px_rgba(0,212,212,0.15)] -translate-y-1.5"
                        : "border-white/5 hover:border-[#00d4d4]/30 hover:shadow-[0_0_20px_rgba(0,212,212,0.1)] hover:-translate-y-1.5",
                    className
                )}
                {...props}
            >
                {active && (
                    <div className={cn(
                        "absolute -top-12 -right-12 w-32 h-32 blur-[60px] rounded-full pointer-events-none",
                        glowColor === "cyan" ? "bg-[#00d4d4]/20" : "bg-white/10"
                    )} />
                )}
                <div className="relative z-10">{children}</div>
            </div>
        );
    }
);
GlowCard.displayName = "GlowCard";
