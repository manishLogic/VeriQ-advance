"use client";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatFAB() {
    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#00d4d4] text-[#070d14] px-5 py-3.5 rounded-full font-sora font-bold shadow-[0_0_30px_rgba(0,212,212,0.35)] hover:bg-[#00e5e5] hover:scale-105 transition-all group"
        >
            <MessageCircle size={20} className="fill-[#070d14]/20 group-hover:animate-pulse" />
            <span>Ask VeriQ AI</span>
        </motion.button>
    );
}
