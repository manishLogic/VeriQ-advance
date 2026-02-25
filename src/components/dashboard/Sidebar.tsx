import Link from "next/link";
import { Home, Upload, Zap, Award, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-[260px] h-screen bg-[#0d1722] border-r border-white/5 flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-white/5">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-[#00d4d4] font-sora font-bold text-[#070d14] flex items-center justify-center shadow-[0_0_10px_rgba(0,212,212,0.4)]">
                        V
                    </div>
                    <span className="font-sora text-lg font-semibold tracking-wide text-white">
                        Veri<span className="text-[#00d4d4]">Q</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2">
                <Link href="/candidate/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white font-medium border-l-2 border-[#00d4d4] transition-colors">
                    <Home size={20} className="text-[#00d4d4]" />
                    Dashboard
                </Link>
                <Link href="/candidate/upload" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#8a9ab0] hover:text-white hover:bg-white/5 transition-colors group border-l-2 border-transparent hover:border-white/20">
                    <Upload size={20} className="group-hover:text-white transition-colors" />
                    Upload Resume
                </Link>
                <Link href="/candidate/skill-test" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#8a9ab0] hover:text-white hover:bg-white/5 transition-colors group border-l-2 border-transparent hover:border-white/20">
                    <Zap size={20} className="group-hover:text-white transition-colors" />
                    Skill Tests
                </Link>
                <Link href="/candidate/trust-score" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#8a9ab0] hover:text-white hover:bg-white/5 transition-colors group border-l-2 border-transparent hover:border-white/20">
                    <Award size={20} className="group-hover:text-white transition-colors" />
                    Trust Score
                </Link>
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
                    <button className="text-[#8a9ab0] hover:text-red-400 transition-colors">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
