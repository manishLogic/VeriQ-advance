"use client";
import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/shared/RippleButton";

export default function PricingPreview() {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Starter",
            desc: "For early-stage teams validating first hires.",
            price: isAnnual ? 79 : 99,
            features: ["Up to 10 candidates/mo", "Basic resume parsing", "Standard skill tests", "Email support"],
            highlight: false
        },
        {
            name: "Pro",
            desc: "For scaling teams optimizing pipeline efficiency.",
            price: isAnnual ? 199 : 249,
            features: ["Unlimited candidates", "Live Anti-Cheat tracking", "Advanced behavioral risk scoring", "Priority 24/7 support", "Custom test creation"],
            highlight: true
        },
        {
            name: "Enterprise",
            desc: "Custom AI tuning + internal ATS integration.",
            price: "Custom",
            features: ["Everything in Pro", "Dedicated account manager", "White-labeled testing", "Custom AI model tuning", "Full API & ATS integration"],
            highlight: false
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="text-center mb-16 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="h2-scale font-bold text-white tracking-tight"
                    >
                        Eliminate hiring uncertainty.
                    </motion.h2>

                    {/* Billing Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-center gap-4 mt-8"
                    >
                        <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-[#8a9ab0]'}`}>Monthly</span>

                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="w-14 h-8 bg-white/10 rounded-full relative border border-white/20 transition-colors hover:bg-white/20"
                        >
                            <motion.div
                                className="w-6 h-6 bg-[#00d4d4] rounded-full absolute top-1 shadow-[0_0_10px_rgba(0,212,212,0.5)]"
                                animate={{ left: isAnnual ? "30px" : "4px" }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>

                        <span className={`text-sm font-medium transition-colors flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-[#8a9ab0]'}`}>
                            Annual <span className="text-[10px] font-bold px-2 py-0.5 bg-[#00d4d4]/20 text-[#00d4d4] rounded-full">SAVE 20%</span>
                        </span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className={`relative rounded-3xl p-8 transition-all duration-300 md:h-[500px] flex flex-col ${plan.highlight
                                ? "glass-panel border-[#00d4d4]/40 shadow-[0_0_40px_rgba(0,212,212,0.15)] md:-mt-8 md:mb-8 z-10"
                                : "bg-[#0b1120] border border-white/5 hover:border-white/20"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-[#00d4d4] to-[#0088cc] text-[#030712] text-xs font-bold rounded-full shadow-[0_0_20px_rgba(0,212,212,0.4)] tracking-wide">
                                    MOST TEAMS CHOOSE THIS
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className={`text-2xl font-sora font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-white'}`}>{plan.name}</h3>
                                <p className="text-sm text-[#8a9ab0] min-h-[40px]">{plan.desc}</p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                {typeof plan.price === 'number' ? (
                                    <>
                                        <span className="text-4xl font-sora font-bold text-white">${plan.price}</span>
                                        <span className="text-[#8a9ab0] text-sm">/mo</span>
                                    </>
                                ) : (
                                    <span className="text-4xl font-sora font-bold text-white">Custom</span>
                                )}
                            </div>

                            <div className="flex-grow space-y-4 mb-8">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-start gap-3 text-sm text-[#8a9ab0]">
                                        <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-[#00d4d4]' : 'text-white/30'}`} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <RippleButton variant={plan.highlight ? "primary" : "secondary"} className="w-full">
                                    Get Started <ArrowRight size={16} />
                                </RippleButton>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="text-sm font-medium text-[#00d4d4] hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#00d4d4]">
                        Compare all plan features
                    </button>
                </div>

            </div>
        </section>
    );
}
