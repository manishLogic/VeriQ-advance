"use client";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { GlowCard } from "@/components/shared/GlowCard";

export default function PricingPage() {
    const plans = [
        {
            name: "Starter",
            desc: "For small teams hiring occasionally.",
            price: "$99",
            period: "/mo",
            features: [
                "Up to 50 active candidates",
                "Basic resume parsing",
                "Standard skill tests (3 topics)",
                "Email support"
            ]
        },
        {
            name: "Pro",
            desc: "For growing companies scaling their pipeline.",
            price: "$299",
            period: "/mo",
            popular: true,
            features: [
                "Unlimited active candidates",
                "Advanced AI claim validation",
                "Full test library & custom tests",
                "Trust Score deep-dives",
                "Priority 24/7 support"
            ]
        },
        {
            name: "Enterprise",
            desc: "Custom solutions for large organizations.",
            price: "Custom",
            period: "",
            features: [
                "Everything in Pro",
                "Dedicated account manager",
                "SSO & Custom Integrations",
                "White-labeled assessments",
                "Volume discounts"
            ]
        }
    ];

    const handleCheckout = async (planName: string) => {
        // In a real app, this hits /api/stripe/checkout
        alert(`Mock Stripe Checkout initialized for ${planName} plan. Ensure Stripe env vars are set to enable real payments.`);
    };

    return (
        <main className="min-h-screen bg-[#070d14] pt-32 pb-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#00d4d4]/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">

                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
                    <Link href="/" className="inline-flex items-center justify-center p-2 bg-white/5 rounded-full border border-white/10 mb-4 hover:bg-white/10 transition-colors">
                        <span className="text-[#00d4d4] font-sora font-semibold text-sm px-4">← Back to Home</span>
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-sora font-bold text-white tracking-tight leading-tight">
                        Transparent pricing for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#00d4d4]">verified hiring.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-[#8a9ab0]">
                        Stop paying for unreviewed resumes. Pay for validated technical talent.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start animate-in slide-in-from-bottom-12 duration-1000 delay-300">
                    {plans.map((plan, idx) => (
                        <GlowCard
                            key={idx}
                            active={plan.popular}
                            glowColor={plan.popular ? "cyan" : "default"}
                            className={`flex flex-col h-full ${plan.popular ? 'border-[#00d4d4]/50 scale-105 z-10 shadow-[0_0_40px_rgba(0,212,212,0.15)] bg-[#0d1722]/90 backdrop-blur-xl' : 'mt-4 bg-[#0d1722]'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00d4d4] text-[#070d14] text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-[0_0_20px_rgba(0,212,212,0.4)]">
                                    <Sparkles size={14} /> MOST POPULAR
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-sora font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-[#8a9ab0] text-sm h-10">{plan.desc}</p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-5xl font-sora font-bold text-white">{plan.price}</span>
                                <span className="text-[#8a9ab0] font-medium">{plan.period}</span>
                            </div>

                            <button
                                onClick={() => handleCheckout(plan.name)}
                                className={`w-full py-4 rounded-xl font-sora font-bold transition-all mb-8 ${plan.popular
                                        ? "bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] shadow-[0_0_20px_rgba(0,212,212,0.2)]"
                                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                                    }`}
                            >
                                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                            </button>

                            <div className="space-y-4 flex-1">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-start gap-3">
                                        <div className={`mt-0.5 rounded-full p-0.5 ${plan.popular ? 'bg-cyan-500/20 text-[#00d4d4]' : 'bg-white/10 text-[#8a9ab0]'}`}>
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span className="text-sm text-white/80">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </GlowCard>
                    ))}
                </div>

            </div>
        </main>
    );
}
