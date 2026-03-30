"use client";

import { useState } from "react";
import { User, Mail, Building2, Users, CheckCircle2, Loader2, ArrowLeft, Send } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";

export default function ContactSales() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate an API call connecting to sales webhook
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6 py-20">
            {/* Background Effects */}
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#00d4d4]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 -left-1/4 w-[600px] h-[600px] bg-[#0088cc]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="w-full max-w-6xl mx-auto relative z-10">
                <button 
                    onClick={() => window.history.back()} 
                    className="flex items-center gap-2 text-[#8a9ab0] hover:text-white transition-colors mb-12"
                >
                    <ArrowLeft size={18} /> Back to Pricing
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Left Column - Sales Pitch / Details */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4d4]/10 border border-[#00d4d4]/20 text-[#00d4d4] text-xs font-bold tracking-widest uppercase mb-6 shadow-[#00d4d4]/20 shadow-sm">
                                Enterprise Integration
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white leading-tight mb-6">
                                Scale your hiring with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4d4] to-[#00aaff]">Tailored AI.</span>
                            </h1>
                            <p className="text-lg text-[#8a9ab0] leading-relaxed max-w-xl">
                                Let’s build a specialized candidate verification pipeline specifically for your infrastructure. Talk to our engineering and sales experts to map out your integration.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            {[
                                { title: "Custom AI Tuning", desc: "Train our parsing models on your historical successful candidate data." },
                                { title: "Dedicated Support", desc: "A private Slack channel and a dedicated technical account manager." },
                                { title: "Deep ATS Integration", desc: "Push assessment scores seamlessly directly into Workday, Lever, or Greenhouse." },
                                { title: "White-label Testing", desc: "Brand the entire testing process with your company's UI tokens." }
                            ].map((feature, i) => (
                                <div key={i} className="space-y-2 relative pl-5">
                                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-[#00d4d4] shadow-[0_0_10px_rgba(0,212,212,0.8)]" />
                                    <h4 className="text-white font-sora font-semibold">{feature.title}</h4>
                                    <p className="text-sm text-[#8a9ab0]">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <GlowCard className="p-8 md:p-10 animate-in fade-in slide-in-from-right-8 duration-500 delay-150">
                        {isSuccess ? (
                            <div className="text-center space-y-6 py-12 animate-in zoom-in-95">
                                <div className="w-24 h-24 mx-auto bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-sora font-bold text-white mb-3">Request Received</h2>
                                    <p className="text-[#8a9ab0]">Our Enterprise team will reach out to you within 24 hours to schedule a deep-dive consultation.</p>
                                </div>
                                <button 
                                    onClick={() => window.location.href = '/'}
                                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors mt-4"
                                >
                                    Return to Home
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-sora font-bold text-white mb-1">Contact Enterprise Sales</h3>
                                    <p className="text-sm text-[#8a9ab0] mb-6">Fill out the details below and we'll be in touch shortly.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#8a9ab0]">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#54647a]">
                                                <User size={18} />
                                            </div>
                                            <input required type="text" className="w-full bg-[#030712] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" placeholder="Jane Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#8a9ab0]">Work Email</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#54647a]">
                                                <Mail size={18} />
                                            </div>
                                            <input required type="email" className="w-full bg-[#030712] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" placeholder="jane@company.com" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#8a9ab0]">Company Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#54647a]">
                                                <Building2 size={18} />
                                            </div>
                                            <input required type="text" className="w-full bg-[#030712] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" placeholder="Acme Corp" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#8a9ab0]">Company Size</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#54647a]">
                                                <Users size={18} />
                                            </div>
                                            <select required className="w-full bg-[#030712] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors appearance-none">
                                                <option value="" disabled selected defaultValue="">Select size...</option>
                                                <option value="1-50">1 - 50 employees</option>
                                                <option value="51-200">51 - 200 employees</option>
                                                <option value="201-1000">201 - 1,000 employees</option>
                                                <option value="1000+">1,000+ employees</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#8a9ab0]">How can we help your team?</label>
                                    <textarea required rows={4} className="w-full bg-[#030712] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors resize-none" placeholder="Let us know what kind of volume and ATS integrations you are looking for..." />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.3)] disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="animate-spin inline" size={18} /> Submitting Request...</>
                                    ) : (
                                        <>Send Request <Send size={18} /></>
                                    )}
                                </button>
                                
                                <p className="text-center text-xs text-[#54647a] pt-4 leading-relaxed">
                                    By submitting this form, you agree to our <a href="#" className="underline hover:text-[#00d4d4]">Terms of Service</a> and <a href="#" className="underline hover:text-[#00d4d4]">Privacy Policy</a>.
                                </p>
                            </form>
                        )}
                    </GlowCard>
                </div>
            </div>
        </div>
    );
}
