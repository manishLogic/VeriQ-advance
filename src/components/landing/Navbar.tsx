import Link from 'next/link';

export default function Navbar() {
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
                    <Link href="/pricing" className="text-sm font-medium text-[#8a9ab0] hover:text-white transition-colors">
                        Pricing
                    </Link>
                    <Link href="/auth/login" className="text-sm font-medium text-[#8a9ab0] hover:text-white transition-colors hidden sm:block">
                        Log In
                    </Link>
                    <Link href="/auth/register" className="bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold px-6 py-2.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(0,212,212,0.4)]">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
