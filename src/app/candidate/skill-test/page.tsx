"use client";
import { useState, useEffect } from "react";
import { Zap, Clock, AlertTriangle, CheckCircle2, Award, FileText } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";

type TestState = "list" | "active" | "result";

const PENDING_TESTS = [
    { id: 1, name: "React Engineering", qs: 10, time: "10s/q" },
    { id: 2, name: "TypeScript Core", qs: 10, time: "10s/q" },
    { id: 3, name: "Next.js Architecture", qs: 10, time: "10s/q" }
];

export default function SkillTest() {
    const [testState, setTestState] = useState<TestState>("list");
    const [activeTest, setActiveTest] = useState<string>("");
    const [qIndex, setQIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (testState === "active" && timeLeft > 0 && selectedAnswer === null) {
            timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0 && selectedAnswer === null) {
            handleNext(false);
        }
        return () => clearInterval(timer);
    }, [testState, timeLeft, selectedAnswer]);

    const startTest = (name: string) => {
        setActiveTest(name);
        setTestState("active");
        setQIndex(0);
        setTimeLeft(10);
        setScore(0);
        setSelectedAnswer(null);
    };

    const handleNext = (correct: boolean) => {
        if (correct) setScore((s) => s + 1);

        if (qIndex < 9) {
            setTimeout(() => {
                setQIndex((i) => i + 1);
                setTimeLeft(10);
                setSelectedAnswer(null);
            }, 1000);
        } else {
            setTimeout(() => setTestState("result"), 1000);
        }
    };

    const handleSelect = (idx: number, isCorrect: boolean) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(idx);
        handleNext(isCorrect);
    };

    if (testState === "list") {
        return (
            <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-8 animate-in fade-in">
                <header className="space-y-2 pb-6 border-b border-white/5">
                    <h1 className="text-3xl font-sora font-bold text-white">Pending Skill Tests</h1>
                    <p className="text-[#8a9ab0]">Complete these rapid-fire tests to validate your skills and generate your Trust Score.</p>
                </header>

                <div className="grid gap-4">
                    {PENDING_TESTS.map((test) => (
                        <GlowCard key={test.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                    <Zap className="text-[#00d4d4]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-sora font-semibold text-white">{test.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-[#8a9ab0] mt-1">
                                        <span className="flex items-center gap-1.5"><FileText size={14} /> {test.qs} Questions</span>
                                        <span className="flex items-center gap-1.5"><Clock size={14} /> {test.time}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => startTest(test.name)}
                                className="w-full sm:w-auto px-6 py-2.5 bg-[#00d4d4]/10 hover:bg-[#00d4d4] text-[#00d4d4] hover:text-[#070d14] border border-[#00d4d4]/30 font-sora font-semibold rounded-xl transition-all"
                            >
                                Start Test
                            </button>
                        </GlowCard>
                    ))}
                </div>

                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-4">
                    <AlertTriangle className="text-orange-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-200 leading-relaxed">
                        <strong>Anti-Cheat Warning:</strong> Navigating away from this tab or minimizing the window while a test is active will immediately fail the current question. You only have 10 seconds per question.
                    </p>
                </div>
            </div>
        );
    }

    if (testState === "active") {
        // Math for SVG Ring
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (timeLeft / 10) * circumference;

        return (
            <div className="fixed inset-0 z-50 bg-[#070d14] flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-300">

                {/* Top Bar */}
                <div className="absolute top-0 w-full p-6 flex justify-between items-center max-w-4xl max-auto">
                    <div>
                        <div className="text-[#00d4d4] font-bold text-sm uppercase tracking-widest">{activeTest}</div>
                        <div className="text-white font-sora font-semibold">Question {qIndex + 1} of 10</div>
                    </div>

                    <div className="relative w-24 h-24 flex items-center justify-center bg-white/5 rounded-full shadow-[0_0_30px_rgba(0,212,212,0.15)]">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="48" cy="48" r={radius} className="stroke-white/10" strokeWidth="6" fill="none" />
                            <circle
                                cx="48"
                                cy="48"
                                r={radius}
                                className="stroke-[#00d4d4] shadow-glow"
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1s linear" }}
                            />
                        </svg>
                        <span className="text-2xl font-sora font-bold text-white relative z-10">{timeLeft}</span>
                    </div>
                </div>

                {/* Question Area */}
                <div className="w-full max-w-3xl space-y-12">
                    <h2 className="text-3xl md:text-5xl font-sora font-semibold text-center text-white leading-tight">
                        Which hook is used to perform side effects in functional components?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { text: "useEffect", isCorrect: true },
                            { text: "useState", isCorrect: false },
                            { text: "useContext", isCorrect: false },
                            { text: "useReducer", isCorrect: false }
                        ].map((ans, idx) => {
                            let stateClasses = "bg-[#0d1722] border-white/10 hover:border-[#00d4d4]/50";

                            if (selectedAnswer === idx) {
                                stateClasses = ans.isCorrect
                                    ? "bg-green-500/20 border-green-500 text-green-400"
                                    : "bg-red-500/20 border-red-500 text-red-400";
                            } else if (selectedAnswer !== null && ans.isCorrect) {
                                // Show correct answer if they got it wrong
                                stateClasses = "bg-green-500/20 border-green-500 text-green-400";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx, ans.isCorrect)}
                                    disabled={selectedAnswer !== null || timeLeft === 0}
                                    className={`w-full p-6 md:p-8 text-left text-xl font-medium rounded-2xl border transition-all ${stateClasses}`}
                                >
                                    {ans.text}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        );
    }

    // Result State
    return (
        <div className="p-8 md:p-12 max-w-3xl mx-auto text-center space-y-8 animate-in slide-in-from-bottom-8">
            <div className="w-32 h-32 mx-auto bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 relative">
                <div className="absolute inset-0 rounded-full border border-green-400 animate-ping opacity-20" />
                <Award className="w-16 h-16 text-green-400" />
            </div>

            <div className="space-y-2">
                <h2 className="text-4xl font-sora font-bold text-white">{activeTest} Complete!</h2>
                <p className="text-[#8a9ab0] text-lg">Your results have been verified and permanently attached to your profile.</p>
            </div>

            <div className="bg-[#0d1722] border border-[#00d4d4]/20 rounded-3xl p-8 flex items-center justify-center gap-12">
                <div className="text-center">
                    <p className="text-sm text-[#8a9ab0] uppercase tracking-wider mb-2">Score</p>
                    <div className="text-6xl font-sora font-bold text-[#00d4d4]">{score}<span className="text-3xl text-white/20">/10</span></div>
                </div>
                <div className="w-px h-24 bg-white/10" />
                <div className="text-center">
                    <p className="text-sm text-[#8a9ab0] uppercase tracking-wider mb-2">Validation</p>
                    <div className="text-2xl font-sora font-bold text-green-400 flex items-center gap-2">
                        <CheckCircle2 /> PASSED
                    </div>
                </div>
            </div>

            <button onClick={() => window.location.href = '/candidate/trust-score'} className="px-10 py-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.3)]">
                View Updated Trust Score
            </button>
        </div>
    );
}
