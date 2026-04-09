"use client";

import Link from 'next/link';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function Navbar() {
    const { user, isLoaded: isClerkLoaded } = useUser();
    const [localRole, setLocalRole] = useState<string | null>(null);
    const [localEmail, setLocalEmail] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const role = localStorage.getItem('user_role');
        const email = localStorage.getItem('user_email');
        if (role) setLocalRole(role);
        if (email) setLocalEmail(email);
    }, []);

    if (!mounted || !isClerkLoaded) return null;

    const displayEmail = user?.primaryEmailAddress?.emailAddress || localEmail;
    const displayName = user?.fullName || user?.firstName || (displayEmail ? displayEmail.split('@')[0] : "");
    const displayRole = localRole || (user ? "candidate" : null);

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#070d14]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-[#00d4d4] font-sora font-bold text-[#070d14] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,212,212,0.4)] group-hover:scale-105 transition-transform">
                        V
                    </div>
                    <span className="font-sora text-xl font-semibold tracking-wide text-white">
                        Veri<span className="text-[#00d4d4]">Q</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    {displayEmail && displayRole ? (
                        <Link href={`/${displayRole}/dashboard`} className="flex items-center gap-2 text-sm font-medium text-white hover:text-[#00d4d4] transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-[#00d4d4]/50">
                            <User size={16} />
                            <span className="capitalize">{displayName}</span>
                        </Link>
                    ) : (
                        <>
                            <Link href="/auth/login" className="text-sm font-medium text-[#8a9ab0] hover:text-white transition-colors hidden sm:block">
                                Log In
                            </Link>
                            <Link href="/auth/login" className="bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold px-6 py-2.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(0,212,212,0.4)]">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
