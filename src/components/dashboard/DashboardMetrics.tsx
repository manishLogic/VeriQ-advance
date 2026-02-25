"use client";
import { useEffect, useState } from "react";
import { Users, AlertTriangle, ShieldCheck, FileText } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

// Helper for count-up animation
const AnimatedNumber = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime: number;
        const duration = 1500; // 1.5s

        const updateCounter = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing out quart
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setDisplayValue(Math.floor(easeOut * value));

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }, [value]);

    return <span>{displayValue}</span>;
};

export default function DashboardMetrics() {
    // Simulated metrics data
    const metrics = [
        {
            title: "Active Candidates",
            value: 124,
            icon: Users,
            color: "text-[#00d4d4]",
            bg: "bg-[#00d4d4]/10",
            border: "border-[#00d4d4]/30"
        },
        {
            title: "Fraud Risk Alerts",
            value: 3,
            icon: AlertTriangle,
            color: "text-red-400",
            bg: "bg-red-500/10",
            border: "border-red-500/30"
        },
        {
            title: "Avg Trust Score",
            value: 92,
            suffix: "%",
            icon: ShieldCheck,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/30"
        },
        {
            title: "Tests Completed",
            value: 842,
            icon: FileText,
            color: "text-white",
            bg: "bg-white/10",
            border: "border-white/20"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
                <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all group flex flex-col justify-between"
                >
                    <div className={`p-3 rounded-xl w-max mb-6 border ${metric.bg} ${metric.color} ${metric.border} group-hover:scale-110 transition-transform`}>
                        <metric.icon size={22} />
                    </div>
                    <div>
                        <h3 className="text-[#8a9ab0] font-medium text-sm mb-2">{metric.title}</h3>
                        <div className="text-4xl font-sora font-bold text-white flex items-baseline gap-1">
                            <AnimatedNumber value={metric.value} />
                            {metric.suffix && <span className="text-xl">{metric.suffix}</span>}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
