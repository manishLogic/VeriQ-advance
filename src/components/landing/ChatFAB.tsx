"use client";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}

export default function ChatFAB() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: "user", parts: [{ text: input }] };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    history: messages.slice(-6) // Send last 3 pairs for context
                }),
            });

            const data = await response.json();
            if (data.text) {
                setMessages(prev => [...prev, { role: "model", parts: [{ text: data.text }] }]);
            } else {
                setMessages(prev => [...prev, { role: "model", parts: [{ text: "I'm sorry, I'm having trouble connecting right now. Please try again later." }] }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "model", parts: [{ text: "Error: Could not reach the VeriQ AI brain." }] }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[350px] sm:w-[400px] h-[500px] bg-[#0b1120] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 ring-1 ring-[#00d4d4]/20"
                    >
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 bg-[#0d1722] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#00d4d4] flex items-center justify-center text-[#070d14]">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Ask VeriQ AI</h3>
                                    <p className="text-[10px] text-green-400">Online & Ready</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-[#8a9ab0] hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                        >
                            {messages.length === 0 && (
                                <div className="text-center py-8 space-y-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-[#00d4d4]">
                                        <MessageCircle size={24} />
                                    </div>
                                    <p className="text-sm text-[#8a9ab0] px-4">
                                        Hi! I'm the VeriQ Assistant. Ask me anything about our Trust Score, anti-cheat engine, or verification process.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {["How it works?", "Pricing?", "Trust Score?"].map(hint => (
                                            <button
                                                key={hint}
                                                onClick={() => setInput(hint)}
                                                className="text-[10px] px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white hover:border-[#00d4d4]/50 hover:bg-[#00d4d4]/5 transition-all"
                                            >
                                                {hint}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                            ? "bg-[#00d4d4] text-[#030712] rounded-tr-none font-medium"
                                            : "bg-white/5 border border-white/10 text-white rounded-tl-none"
                                        }`}>
                                        {msg.parts[0].text}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                                        <Loader2 size={16} className="animate-spin text-[#00d4d4]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-[#0d1722] border-t border-white/10 flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00d4d4] transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 bg-[#00d4d4] text-[#070d14] rounded-xl flex items-center justify-center hover:bg-[#00e5e5] disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)]"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-full font-sora font-bold shadow-[0_0_30px_rgba(0,212,212,0.35)] transition-all group ${isOpen ? "bg-white/10 text-white border border-white/10" : "bg-[#00d4d4] text-[#070d14] hover:bg-[#00e5e5] hover:scale-105"
                    }`}
            >
                {isOpen ? <X size={20} /> : <MessageCircle size={20} className="fill-current/20 group-hover:animate-pulse" />}
                <span>{isOpen ? "Close AI" : "Ask VeriQ AI"}</span>
            </motion.button>
        </div>
    );
}

