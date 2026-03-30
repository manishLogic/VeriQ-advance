"use client";
import { useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, Check, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RippleButton } from "@/components/shared/RippleButton";

export default function PricingPreview() {
    const [isAnnual, setIsAnnual] = useState(true);

    // Modal & Payment State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPlanPrice, setSelectedPlanPrice] = useState<number | string>(0);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const handleSubscribe = (price: number | string) => {
        if (price === "Custom") {
            window.location.href = "/contact-sales";
            return;
        }
        setSelectedPlanPrice(price);
        setShowPaymentModal(true);
    };

    const submitPayment = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setShowPaymentModal(false);
            showToast("Payment successful! Welcome to VeriQ Pro.");
        }, 2000);
    };

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
            
            {/* Floating Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -20, x: "-50%" }}
                        className="fixed top-24 left-1/2 z-[100] shadow-2xl"
                    >
                        <div className="bg-[#00d4d4] text-[#030712] font-semibold px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(0,212,212,0.4)]">
                            <Check size={18} />
                            {toastMessage}
                            <button onClick={() => setToastMessage(null)} className="ml-2 hover:bg-black/10 rounded-full p-1 transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Modal Overlay */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
                        onClick={() => !isProcessingPayment && setShowPaymentModal(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-[#0d1722] border border-white/10 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#00d4d4] shadow-[0_0_20px_rgba(0,212,212,0.6)]" />
                        
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h2 className="text-2xl font-sora font-semibold text-white">Secure Checkout</h2>
                                    <p className="text-[#8a9ab0] text-sm mt-1">Complete your subscription setup.</p>
                                </div>
                                <button 
                                    onClick={() => !isProcessingPayment && setShowPaymentModal(false)}
                                    className="p-2 text-[#8a9ab0] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors shrink-0 outline-none"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-5 bg-gradient-to-br from-[#00d4d4]/10 to-transparent border border-[#00d4d4]/20 rounded-xl relative overflow-hidden flex items-center justify-between">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00d4d4]/10 blur-xl rounded-full" />
                                <div className="relative z-10">
                                    <p className="text-sm text-[#00d4d4] font-medium uppercase tracking-wider mb-1">Total Due</p>
                                    <p className="text-4xl font-sora font-bold text-white">${selectedPlanPrice}<span className="text-lg text-white/50">/{isAnnual ? 'yr' : 'mo'}</span></p>
                                </div>
                                <ShieldCheck className="w-12 h-12 text-[#00d4d4] opacity-80" />
                            </div>
                            
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-[#8a9ab0] mb-2">Select Payment Method</p>
                                
                                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${paymentMethod === 'card' ? 'bg-[#00d4d4]/10 border-[#00d4d4]/50 shadow-[0_0_15px_rgba(0,212,212,0.1)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                    <input 
                                        type="radio" 
                                        name="payment_method" 
                                        className="accent-[#00d4d4] w-4 h-4 cursor-pointer"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                    />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span className="text-white font-medium">Credit Card</span>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-5 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                                            <div className="w-8 h-5 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-bold text-white">MC</div>
                                        </div>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${paymentMethod === 'paypal' ? 'bg-[#00d4d4]/10 border-[#00d4d4]/50 shadow-[0_0_15px_rgba(0,212,212,0.1)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                    <input 
                                        type="radio" 
                                        name="payment_method" 
                                        className="accent-[#00d4d4] w-4 h-4 cursor-pointer"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={() => setPaymentMethod('paypal')}
                                    />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span className="text-white font-medium">PayPal</span>
                                        <span className="text-blue-400 font-bold italic text-sm tracking-tighter">PayPal</span>
                                    </div>
                                </label>
                                
                                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${paymentMethod === 'crypto' ? 'bg-[#00d4d4]/10 border-[#00d4d4]/50 shadow-[0_0_15px_rgba(0,212,212,0.1)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                    <input 
                                        type="radio" 
                                        name="payment_method" 
                                        className="accent-[#00d4d4] w-4 h-4 cursor-pointer"
                                        checked={paymentMethod === 'crypto'}
                                        onChange={() => setPaymentMethod('crypto')}
                                    />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span className="text-white font-medium">Crypto (USDC / BTC)</span>
                                        <span className="text-yellow-400 font-bold text-lg leading-none">₿</span>
                                    </div>
                                </label>
                            </div>
                            
                            <button 
                                onClick={submitPayment}
                                disabled={isProcessingPayment}
                                className="w-full py-4 mt-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.3)] disabled:opacity-70 flex justify-center items-center"
                            >
                                {isProcessingPayment ? (
                                    <><Loader2 className="animate-spin inline mr-2" size={18} /> Processing securely...</>
                                ) : (
                                    `Subscribe via ${paymentMethod === 'card' ? 'Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Crypto'}`
                                )}
                            </button>
                            <p className="text-center text-xs text-[#54647a] mt-4 flex items-center justify-center gap-2">
                                <ShieldCheck size={14} className="text-[#00d4d4]" /> 256-bit SSL Secured Processing
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
                                ? "glass-panel bg-[#0b1120]/80 border-[#00d4d4]/40 shadow-[0_0_40px_rgba(0,212,212,0.15)] md:-mt-8 md:mb-8 z-10"
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

                            <div className="mt-auto" onClick={() => handleSubscribe(plan.price)}>
                                <RippleButton variant={plan.highlight ? "primary" : "secondary"} className="w-full flex justify-center items-center pointer-events-auto">
                                    Get Started <ArrowRight size={16} className="ml-2" />
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
