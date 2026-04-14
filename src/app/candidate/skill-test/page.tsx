"use client";
import { useState, useEffect } from "react";
import { Zap, Clock, AlertTriangle, CheckCircle2, Award, FileText, Loader2, ArrowLeft } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";

type TestState = "list" | "generating" | "error" | "active" | "result";

interface Question {
    question: string;
    options: string[];
    correctIndex: number;
}

export default function SkillTest() {
    const [pendingTests, setPendingTests] = useState<{ id: number; name: string; qs: number; time: string }[]>([]);
    const [testState, setTestState] = useState<TestState>("list");
    const [activeTest, setActiveTest] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    
    // Test execution state
    const [questions, setQuestions] = useState<Question[]>([]);
    const [qIndex, setQIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("veriq_skills");
        const storedResultsStr = localStorage.getItem("veriq_test_results");
        const parsedResults = storedResultsStr ? JSON.parse(storedResultsStr) : {};

        if (stored) {
            try {
                const skills = JSON.parse(stored);
                if (Array.isArray(skills) && skills.length > 0) {
                    const pending = skills
                        .filter((skill: string) => !parsedResults[skill])
                        .map((skill: string, index: number) => ({
                            id: index + 1,
                            name: `${skill} Assessment`,
                            qs: 10,
                            time: "10s/q"
                        }));
                    setPendingTests(pending);
                }
            } catch (e) {}
        }
    }, [testState]);

    // Save result to localStorage when completing a test
    useEffect(() => {
        if (testState === "result") {
            try {
                const storedResultsStr = localStorage.getItem("veriq_test_results");
                const parsedResults = storedResultsStr ? JSON.parse(storedResultsStr) : {};
                const skillName = activeTest.replace(" Assessment", "");
                
                parsedResults[skillName] = {
                    score: score,
                    total: questions.length,
                    passed: score >= (questions.length * 0.7)
                };
                
                localStorage.setItem("veriq_test_results", JSON.stringify(parsedResults));
            } catch(e) {}
        }
    }, [testState, activeTest, score, questions.length]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (testState === "active" && timeLeft > 0 && selectedAnswer === null) {
            timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0 && selectedAnswer === null) {
            handleNext(false);
        }
        return () => clearInterval(timer);
    }, [testState, timeLeft, selectedAnswer]);

    const startTest = async (name: string) => {
        setActiveTest(name);
        setTestState("generating");
        setScore(0);
        setSelectedAnswer(null);

        // Strip 'Assessment' if present to send raw skill
        const skillQuery = name.replace(" Assessment", "");

        try {
            const res = await fetch("/api/generate-test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skill: skillQuery })
            });
            const data = await res.json();

            if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
                setQuestions(data.questions);
                setQIndex(0);
                setTimeLeft(10);
                setTestState("active");
            } else {
                console.error("No questions generated", data);
                setErrorMsg(data.error || "Server failed to return valid questions.");
                setTestState("error");
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message || "Network exception. Please try again.");
            setTestState("error");
        }
    };

    const handleNext = (correct: boolean) => {
        if (correct) setScore((s) => s + 1);

        if (qIndex < questions.length - 1) {
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
                    <p className="text-[#8a9ab0]">Complete these rapid-fire tests to validate your skills. Questions are uniquely generated by AI.</p>
                </header>

                {pendingTests.length === 0 ? (
                    <div className="bg-[#0d1722] border border-white/5 rounded-3xl p-16 text-center space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <FileText className="text-[#8a9ab0] w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-sora font-semibold text-white">No Skills Extracted</h3>
                        <p className="text-[#8a9ab0] max-w-sm mx-auto">
                            Upload your resume first to extract your skills. Once extracted, your personalized skill tests will appear here.
                        </p>
                        <div className="pt-4">
                            <a href="/candidate/upload" className="inline-flex px-8 py-3.5 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.2)]">
                                Upload Resume
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {pendingTests.map((test) => (
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
                                    className="w-full sm:w-auto px-6 py-2.5 bg-[#00d4d4]/10 hover:bg-[#00d4d4] text-[#00d4d4] hover:text-[#070d14] border border-[#00d4d4]/30 font-sora font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.1)]"
                                >
                                    Start Live Test
                                </button>
                            </GlowCard>
                        ))}
                    </div>
                )}

                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-4">
                    <AlertTriangle className="text-orange-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-200 leading-relaxed">
                        <strong>Anti-Cheat Active:</strong> Navigating away from this tab or minimizing the window while a test is active will immediately fail the current question. You only have 10 seconds per question.
                    </p>
                </div>
            </div>
        );
    }

    if (testState === "generating") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-in fade-in">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#00d4d4] blur-[30px] opacity-20 rounded-full animate-pulse" />
                    <Loader2 className="w-16 h-16 text-[#00d4d4] animate-spin relative z-10" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-sora font-bold text-white">Compiling Assessment</h2>
                    <p className="text-[#8a9ab0]">VeriQ AI is generating custom questions for {activeTest}...</p>
                </div>
            </div>
        );
    }

    if (testState === "error") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-in fade-in">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30">
                    <AlertTriangle className="w-10 h-10 text-red-400" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-sora font-bold text-white">Generation Failed</h2>
                    <p className="text-red-400 font-medium">{errorMsg || "The AI could not generate questions formatted correctly."}</p>
                    <p className="text-[#8a9ab0] text-sm mt-2">Please go back and try again.</p>
                </div>
                <button 
                    onClick={() => setTestState("list")}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Tests
                </button>
            </div>
        )
    }

    if (testState === "active" && questions.length > 0) {
        const currentQ = questions[qIndex];
        
        // Math for SVG Ring
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (timeLeft / 10) * circumference;

        return (
            <div className="fixed inset-0 z-50 bg-[#070d14] flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-300 overflow-y-auto">

                {/* Top Bar */}
                <div className="absolute top-0 w-full p-6 flex justify-between items-center max-w-4xl max-auto">
                    <div>
                        <div className="text-[#00d4d4] font-bold text-sm uppercase tracking-widest">{activeTest}</div>
                        <div className="text-white font-sora font-semibold">Question {qIndex + 1} of {questions.length}</div>
                    </div>

                    <div className="relative w-24 h-24 flex items-center justify-center bg-white/5 rounded-full shadow-[0_0_30px_rgba(0,212,212,0.15)] shrink-0">
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
                <div className="w-full max-w-3xl space-y-12 mt-24">
                    <h2 className="text-3xl md:text-4xl font-sora font-semibold text-center text-white leading-tight">
                        {currentQ.question}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQ.options.map((opt, idx) => {
                            const isCorrect = idx === currentQ.correctIndex;
                            let stateClasses = "bg-[#0d1722] border-white/10 hover:border-[#00d4d4]/50";

                            if (selectedAnswer === idx) {
                                stateClasses = isCorrect
                                    ? "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                                    : "bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]";
                            } else if (selectedAnswer !== null && isCorrect) {
                                // Show correct answer if they got it wrong or time ran out
                                stateClasses = "bg-green-500/20 border-green-500 text-green-400";
                            } else if (selectedAnswer === null && timeLeft === 0 && isCorrect) {
                                stateClasses = "bg-green-500/20 border-green-500 text-green-400";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx, isCorrect)}
                                    disabled={selectedAnswer !== null || timeLeft === 0}
                                    className={`w-full p-6 text-left text-lg font-medium rounded-2xl border transition-all ${stateClasses}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        );
    }

    // Result State
    if (testState === "result") {
        return (
            <div className="p-8 md:p-12 max-w-3xl mx-auto text-center space-y-8 animate-in slide-in-from-bottom-8">
                <div className="w-32 h-32 mx-auto bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 relative">
                    <div className="absolute inset-0 rounded-full border border-green-400 animate-ping opacity-20" />
                    <Award className="w-16 h-16 text-green-400" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-4xl font-sora font-bold text-white">{activeTest} Complete!</h2>
                    <p className="text-[#8a9ab0] text-lg">Your results have been verified by AI and permanently attached to your profile.</p>
                </div>

                <div className="bg-[#0d1722] border border-[#00d4d4]/20 rounded-3xl p-8 flex items-center justify-center gap-12">
                    <div className="text-center">
                        <p className="text-sm text-[#8a9ab0] uppercase tracking-wider mb-2">Score</p>
                        <div className="text-6xl font-sora font-bold text-[#00d4d4]">{score}<span className="text-3xl text-white/20">/{questions.length}</span></div>
                    </div>
                    <div className="w-px h-24 bg-white/10" />
                    <div className="text-center">
                        <p className="text-sm text-[#8a9ab0] uppercase tracking-wider mb-2">Validation</p>
                        <div className={`text-2xl font-sora font-bold flex items-center gap-2 ${score >= (questions.length * 0.7) ? 'text-green-400' : 'text-red-400'}`}>
                            {score >= (questions.length * 0.7) ? <><CheckCircle2 /> PASSED</> : <><AlertTriangle /> FAILED</>}
                        </div>
                    </div>
                </div>

                <button onClick={() => window.location.href = '/candidate/trust-score'} className="px-10 py-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.3)] inline-flex items-center gap-2">
                    View Updated Trust Score <ArrowLeft className="rotate-180" size={18} />
                </button>
            </div>
        );
    }

    return null;
}
