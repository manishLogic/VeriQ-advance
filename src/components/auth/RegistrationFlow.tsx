"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2, ChevronRight, Briefcase, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegistrationFlow() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<"candidate" | "recruiter" | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        companyName: "",
        jobTitle: ""
    });

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Live Password Strength Meter Simulate
    useEffect(() => {
        let str = 0;
        if (formData.password.length > 5) str += 25;
        if (formData.password.length > 8) str += 25;
        if (/[A-Z]/.test(formData.password)) str += 25;
        if (/[0-9]/.test(formData.password)) str += 25;
        setPasswordStrength(str);
    }, [formData.password]);

    const handleNext = () => {
        if (step === 1 && !role) return;
        setStep(p => p + 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay and backend logic to save to localStorage
        setTimeout(() => {
            const userData = {
                ...formData,
                role,
                isAuthenticated: true,
                onboardingComplete: true,
                // Mock mock backend generated trust score for demo
                simulatedTrustScore: role === "candidate" ? 88 : null
            };

            localStorage.setItem("veriq_session", JSON.stringify(userData));

            // Generate mock records based on role
            if (role === "recruiter") {
                localStorage.setItem("veriq_mock_candidates", JSON.stringify([
                    { id: 1, name: "Sarah Jenkins", role: "Frontend Dev", score: 94, status: "Verified" },
                    { id: 2, name: "Michael Chen", role: "Backend Eng", score: 82, status: "Pending" }
                ]));
            }

            setStep(4); // Success Step

            // Redirect after success animation
            setTimeout(() => {
                router.push(`/${role}/dashboard`);
            }, 2000);

        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto relative relative z-10">

            {/* Progress Indicator */}
            {step < 4 && (
                <div className="mb-8 relative">
                    <div className="flex justify-between items-center text-xs font-semibold text-[#8a9ab0] uppercase tracking-wider mb-2">
                        <span>Step {step} of 3</span>
                        {step === 1 && <span>Select Role</span>}
                        {step === 2 && <span>Account Details</span>}
                        {step === 3 && <span>{role === 'recruiter' ? 'Company Info' : 'Professional Info'}</span>}
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#00d4d4] to-[#0088cc]"
                            initial={{ width: `${((step - 1) / 3) * 100}%` }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            )}

            <div className="glass-panel overflow-hidden relative rounded-3xl border border-white/10 shadow-2xl bg-[#0b1120]/80 backdrop-blur-xl">
                <AnimatePresence mode="wait">

                    {/* STEP 1: Select Role */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8"
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-sora font-bold text-white mb-2">Welcome to VeriQ</h1>
                                <p className="text-sm text-[#8a9ab0]">How will you be using the platform?</p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setRole("recruiter")}
                                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${role === "recruiter"
                                        ? "bg-[#00d4d4]/10 border-[#00d4d4]/40 shadow-[0_0_20px_rgba(0,212,212,0.1)]"
                                        : "bg-white/5 border-white/5 hover:border-white/20"
                                        }`}
                                >
                                    <div className={`p-3 rounded-xl ${role === 'recruiter' ? 'bg-[#00d4d4]' : 'bg-white/10'} transition-colors`}>
                                        <Building2 size={24} className={role === 'recruiter' ? 'text-[#030712]' : 'text-white'} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white mb-1">I'm Hiring</h3>
                                        <p className="text-xs text-[#8a9ab0]">Evaluate and verify candidates</p>
                                    </div>
                                    <CheckCircle2 className={`text-[#00d4d4] mt-1 transition-opacity duration-300 ${role === "recruiter" ? "opacity-100" : "opacity-0"}`} size={20} />
                                </button>

                                <button
                                    onClick={() => setRole("candidate")}
                                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${role === "candidate"
                                        ? "bg-[#00d4d4]/10 border-[#00d4d4]/40 shadow-[0_0_20px_rgba(0,212,212,0.1)]"
                                        : "bg-white/5 border-white/5 hover:border-white/20"
                                        }`}
                                >
                                    <div className={`p-3 rounded-xl ${role === 'candidate' ? 'bg-[#00d4d4]' : 'bg-white/10'} transition-colors`}>
                                        <Briefcase size={24} className={role === 'candidate' ? 'text-[#030712]' : 'text-white'} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white mb-1">I'm a Candidate</h3>
                                        <p className="text-xs text-[#8a9ab0]">Take tests and verify my skills</p>
                                    </div>
                                    <CheckCircle2 className={`text-[#00d4d4] mt-1 transition-opacity duration-300 ${role === "candidate" ? "opacity-100" : "opacity-0"}`} size={20} />
                                </button>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!role}
                                className="w-full mt-8 py-4 bg-[#00d4d4] text-[#030712] font-semibold rounded-xl transition-all hover:bg-[#00e5e5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                Continue <ChevronRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 2: Basic Account Details */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8"
                        >
                            <div className="mb-8">
                                <h2 className="text-2xl font-sora font-bold text-white mb-2">Create Account</h2>
                                <p className="text-sm text-[#8a9ab0]">Fill in your login details securely.</p>
                            </div>

                            <div className="space-y-6">
                                {/* Floating Label Input Block */}
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="block w-full px-4 pt-6 pb-2 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-[#00d4d4] peer transition-colors"
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="fullName" className="absolute text-sm text-[#8a9ab0] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#00d4d4]">
                                        Full Name
                                    </label>
                                </div>

                                <div className="relative group">
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="block w-full px-4 pt-6 pb-2 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-[#00d4d4] peer transition-colors"
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="email" className="absolute text-sm text-[#8a9ab0] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#00d4d4]">
                                        Email Address
                                    </label>
                                </div>

                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="block w-full px-4 pt-6 pb-2 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-[#00d4d4] peer transition-colors pr-12"
                                        placeholder=" "
                                        required
                                    />
                                    <label htmlFor="password" className="absolute text-sm text-[#8a9ab0] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#00d4d4]">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a9ab0] hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {/* Password Strength Meter */}
                                {formData.password.length > 0 && (
                                    <div className="space-y-1 mt-2">
                                        <div className="flex gap-1 h-1.5 w-full">
                                            {[25, 50, 75, 100].map((threshold) => (
                                                <div
                                                    key={threshold}
                                                    className={`flex-1 rounded-full transition-colors duration-500 ${passwordStrength >= threshold
                                                        ? passwordStrength > 50 ? 'bg-[#00d4d4]' : 'bg-yellow-400'
                                                        : 'bg-white/10'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-[#8a9ab0]">
                                            {passwordStrength <= 25 ? 'Weak' : passwordStrength <= 50 ? 'Fair' : passwordStrength <= 75 ? 'Good' : 'Strong'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-4 bg-transparent border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!formData.fullName || !formData.email || formData.password.length < 6}
                                    className="flex-1 py-4 bg-white text-[#030712] font-semibold rounded-xl transition-all hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Next Step <ChevronRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Role Specific Details */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8"
                        >
                            <div className="mb-8">
                                <h2 className="text-2xl font-sora font-bold text-white mb-2">Almost Done</h2>
                                <p className="text-sm text-[#8a9ab0]">
                                    {role === "recruiter" ? "Tell us about your organization." : "What role are you verifying for?"}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {role === "recruiter" ? (
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="companyName"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                            className="block w-full px-4 pt-6 pb-2 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-[#00d4d4] peer transition-colors"
                                            placeholder=" "
                                            required
                                        />
                                        <label htmlFor="companyName" className="absolute text-sm text-[#8a9ab0] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#00d4d4]">
                                            Company Name
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                            className="block w-full px-4 pt-6 pb-2 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-[#00d4d4] peer transition-colors"
                                            placeholder=" "
                                            required
                                        />
                                        <label htmlFor="jobTitle" className="absolute text-sm text-[#8a9ab0] duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#00d4d4]">
                                            Target Job Title (e.g. Frontend Dev)
                                        </label>
                                    </div>
                                )}

                                <div className="flex gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="px-6 py-4 bg-transparent border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-all disabled:opacity-50"
                                        disabled={isSubmitting}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || (role === 'recruiter' && !formData.companyName) || (role === 'candidate' && !formData.jobTitle)}
                                        className="relative overflow-hidden flex-1 py-4 bg-[#00d4d4] text-[#030712] font-semibold rounded-xl transition-all hover:bg-[#00e5e5] disabled:opacity-80 disabled:cursor-wait group"
                                    >
                                        <span className={`flex items-center justify-center gap-2 transition-opacity ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                                            Complete Setup <ChevronRight size={18} />
                                        </span>
                                        {/* Loading spinner state */}
                                        {isSubmitting && (
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 text-[#030712]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* STEP 4: Animated Success State */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="w-20 h-20 bg-[#00d4d4]/20 rounded-full flex items-center justify-center mb-6 relative"
                            >
                                <div className="absolute inset-0 rounded-full border-4 border-[#00d4d4]/30 animate-pulse" />
                                <CheckCircle2 size={40} className="text-[#00d4d4]" />
                            </motion.div>
                            <h2 className="text-2xl font-sora font-bold text-white mb-2">Environment Provisioned</h2>
                            <p className="text-[#8a9ab0]">Redirecting to your secure dashboard...</p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
