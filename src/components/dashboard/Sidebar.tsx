"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Upload, Zap, Award, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { signOut } = useClerk();

    const navItems = [
        { href: "/candidate/dashboard", icon: Home, label: "Dashboard" },
        { href: "/candidate/upload", icon: Upload, label: "Upload Resume" },
        { href: "/candidate/skill-test", icon: Zap, label: "Skill Tests" },
        { href: "/candidate/trust-score", icon: Award, label: "Trust Score" },
    ];

    return (
        <>
            {/* Mobile Header bar */}
            <div className="lg:hidden fixed top-0 w-full z-40 bg-[#070d14]/90 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00d4d4] font-sora font-bold text-[#070d14] flex items-center justify-center shadow-[0_0_10px_rgba(0,212,212,0.4)]">
                        V
                    </div>
                    <span className="font-sora text-lg font-semibold tracking-wide text-white">
                        Veri<span className="text-[#00d4d4]">Q</span>
                    </span>
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-[#8a9ab0] hover:text-white transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Backdrop overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-[#0d1722] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 ease-in-out w-[260px] ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="p-6 border-b border-white/5 h-16 lg:h-auto flex items-center lg:block">
                    <Link href="/" className="items-center gap-3 group hidden lg:flex">
                        <div className="w-8 h-8 rounded-full bg-[#00d4d4] font-sora font-bold text-[#070d14] flex items-center justify-center shadow-[0_0_10px_rgba(0,212,212,0.4)]">
                            V
                        </div>
                        <span className="font-sora text-lg font-semibold tracking-wide text-white">
                            Veri<span className="text-[#00d4d4]">Q</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors group border-l-2 ${isActive
                                    ? "bg-white/5 text-white border-[#00d4d4]"
                                    : "text-[#8a9ab0] hover:text-white hover:bg-white/5 border-transparent hover:border-white/20"
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? "text-[#00d4d4]" : "group-hover:text-white transition-colors"} />
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-white/5">
                        <Link href="/candidate/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#8a9ab0] hover:text-white hover:bg-white/5 transition-colors group border-l-2 border-transparent hover:border-white/20">
                            <Settings size={20} className="group-hover:text-white transition-colors" />
                            Settings
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-sora font-semibold text-white">
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">John Doe</p>
                            <p className="text-xs text-[#8a9ab0] truncate">Candidate</p>
                        </div>
                        <button onClick={() => signOut(() => router.push("/"))} className="text-[#8a9ab0] hover:text-red-400 transition-colors">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
