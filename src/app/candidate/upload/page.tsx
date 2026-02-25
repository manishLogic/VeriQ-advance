"use client";
import { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

export default function ResumeUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const simulateUpload = () => {
        setIsUploading(true);
        let current = 0;
        const interval = setInterval(() => {
            current += 10;
            setProgress(current);
            if (current >= 100) {
                clearInterval(interval);
                setTimeout(() => setIsComplete(true), 500);
            }
        }, 300);
    };

    return (
        <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10 animate-in fade-in">
            <header className="space-y-4 text-center pb-8 border-b border-white/5">
                <h1 className="text-3xl font-sora font-bold text-white">Upload Your Resume</h1>
                <p className="text-[#8a9ab0]">VeriQ's AI will extract your skills and instantly prep your profile.</p>
            </header>

            {!isComplete ? (
                <div
                    onClick={!isUploading ? simulateUpload : undefined}
                    className={`border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 ${isUploading
                            ? "border-[#00d4d4]/50 bg-[#00d4d4]/5 cursor-default"
                            : "border-white/20 bg-[#0d1722] hover:border-[#00d4d4]/50 hover:bg-[#0d1722]/80 cursor-pointer group"
                        }`}
                >
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#00d4d4]/10 transition-colors">
                        <UploadCloud className={`w-10 h-10 ${isUploading ? 'text-[#00d4d4] animate-bounce' : 'text-[#8a9ab0] group-hover:text-[#00d4d4]'}`} />
                    </div>

                    {isUploading ? (
                        <div className="max-w-md mx-auto space-y-4">
                            <h3 className="text-xl font-sora font-semibold text-white">Parsing your resume...</h3>
                            <div className="h-2 w-full bg-[#070d14] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#00d4d4] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,212,212,0.5)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-sm text-[#00d4d4] font-medium">{progress}% Complete</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-sora font-semibold text-white mb-2">Drag and drop your PDF here</h3>
                            <p className="text-[#8a9ab0]">or click anywhere to browse your files</p>
                            <div className="mt-8">
                                <span className="px-6 py-3 bg-white/5 text-white font-medium rounded-full border border-white/10 group-hover:bg-[#00d4d4] group-hover:text-[#070d14] group-hover:border-[#00d4d4] transition-all">
                                    Browse Files
                                </span>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="bg-[#0d1722] border border-[#00d4d4]/30 rounded-3xl p-10 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00d4d4]/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 w-24 h-24 mx-auto bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                        <CheckCircle2 className="w-12 h-12 text-green-400" />
                    </div>

                    <div className="relative z-10 space-y-2">
                        <h2 className="text-3xl font-sora font-bold text-white">Analysis Complete!</h2>
                        <p className="text-[#8a9ab0]">We've extracted your core skills. Next step: Technical Validation.</p>
                    </div>

                    <div className="relative z-10 flex flex-wrap justify-center gap-2 max-w-lg mx-auto py-4">
                        {["React", "TypeScript", "Next.js", "Node.js", "GraphQL"].map((skill) => (
                            <span key={skill} className="px-4 py-2 bg-[#00d4d4]/10 border border-[#00d4d4]/30 text-[#00d4d4] rounded-xl font-medium shadow-[0_0_10px_rgba(0,212,212,0.1)]">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <button onClick={() => window.location.href = '/candidate/skill-test'} className="relative z-10 px-10 py-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.3)]">
                        Proceed to Skill Tests
                    </button>
                </div>
            )}
        </div>
    );
}
