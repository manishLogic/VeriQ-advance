"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PricingPreview() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#070d14]">
            {/* Subtle top border gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4d4]/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="bg-[#0d1722] border border-white/5 rounded-[2rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">

                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00d4d4]/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#00d4d4]/20 transition-colors duration-700" />

                    <div className="lg:w-1/2 space-y-6 relative z-10 text-center lg:text-left">
                        <h2 className="text-3xl md:text-5xl font-sora font-bold text-white leading-tight">
                            Ready to hire with <span className="text-[#00d4d4]">verified trust?</span>
                        </h2>
                        <p className="text-[#8a9ab0] text-lg max-w-lg mx-auto lg:mx-0">
                            Stop wasting engineering hours on unqualified interviews. Switch to VeriQ and build a pipeline structured entirely on mathematically validated skills.
                        </p>
                    </div>

                    <div className="relative z-10 lg:w-1/2 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6 w-full">
                        <div className="hidden sm:block text-right pr-6 border-r border-white/10">
                            <p className="text-sm font-medium text-white mb-1">Plans starting at</p>
                            <p className="text-3xl font-sora font-bold text-[#00d4d4]">$99<span className="text-sm text-[#8a9ab0] font-normal">/mo</span></p>
                        </div>
                        <Link
                            href="/pricing"
                            className="w-full sm:w-auto px-8 py-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.2)] hover:shadow-[0_0_30px_rgba(0,212,212,0.4)] flex items-center justify-center gap-2"
                        >
                            View Pricing <ArrowRight size={20} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
