"use client";

import { useState } from "react";
import { User, Bell, Shield, Key } from "lucide-react";

export default function CandidateSettings() {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
    ];

    return (
        <div className="p-8 md:p-12 max-w-6xl mx-auto animate-in fade-in duration-500">
            <header className="mb-10 lg:text-left text-center">
                <h1 className="text-3xl font-sora font-bold text-white mb-2">Account Settings</h1>
                <p className="text-[#8a9ab0]">Manage your candidate profile and preferences.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Options Sidebar */}
                <div className="w-full md:w-64 shrink-0 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                                activeTab === tab.id
                                    ? "bg-[#00d4d4]/10 text-[#00d4d4] border border-[#00d4d4]/30 shadow-[0_0_15px_rgba(0,212,212,0.1)]"
                                    : "text-[#8a9ab0] hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? "text-[#00d4d4]" : "text-[#8a9ab0]"} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-[#0d1722] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                    {activeTab === "profile" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-xl font-sora font-semibold text-white border-b border-white/5 pb-4">Profile Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-[#8a9ab0]">First Name</label>
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" placeholder="Jane" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#8a9ab0]">Last Name</label>
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" placeholder="Doe" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-[#8a9ab0]">Email Address</label>
                                    <input type="email" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-[#54647a] cursor-not-allowed" value="jane.doe@example.com" disabled />
                                    <p className="text-xs text-[#54647a] mt-1">To change your email, please contact support.</p>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-[#8a9ab0]">Professional Bio</label>
                                    <textarea className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors h-28 resize-none" placeholder="I am a software engineer with 5 years of experience..." />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button className="px-6 py-2.5 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)]">
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-xl font-sora font-semibold text-white border-b border-white/5 pb-4">Notification Preferences</h2>
                            <div className="space-y-3">
                                {[
                                    { title: "Skill Test Results", desc: "Get notified when your skill tests are graded.", defaultChecked: true },
                                    { title: "Trust Score Updates", desc: "Receive alerts when your VeriQ Trust Score changes.", defaultChecked: true },
                                    { title: "Recruiter Views", desc: "Know when recruiters look at your verified profile.", defaultChecked: false },
                                    { title: "Product Updates", desc: "News regarding our platform features and updates.", defaultChecked: false },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start sm:items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors gap-4">
                                        <div>
                                            <h4 className="text-white font-medium text-sm md:text-base">{item.title}</h4>
                                            <p className="text-xs md:text-sm text-[#8a9ab0] mt-1">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
                                            <div className="w-11 h-6 bg-[#1a2634] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00d4d4]"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-xl font-sora font-semibold text-white border-b border-white/5 pb-4">Security Settings</h2>
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <div className="p-3 bg-[#0d1722] border border-white/5 rounded-full text-[#8a9ab0]">
                                        <Key size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-medium">Password</h4>
                                        <p className="text-sm text-[#8a9ab0] mt-1">Change your current password.</p>
                                    </div>
                                    <button className="w-full sm:w-auto px-4 py-2 mt-2 sm:mt-0 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-colors text-sm font-medium">
                                        Update Password
                                    </button>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-[#00d4d4]/5 border border-[#00d4d4]/20 rounded-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4d4]/10 blur-3xl rounded-full" />
                                    <div className="p-3 bg-[#00d4d4]/10 border border-[#00d4d4]/20 rounded-full text-[#00d4d4] relative list-none z-10">
                                        <Shield size={20} />
                                    </div>
                                    <div className="flex-1 relative z-10">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#00d4d4]/20 text-[#00d4d4] rounded-full border border-[#00d4d4]/30">Active</span>
                                        </div>
                                        <p className="text-sm text-[#8a9ab0] mt-1">Your account has extra security enabled.</p>
                                    </div>
                                    <button className="w-full sm:w-auto px-4 py-2 mt-2 sm:mt-0 bg-transparent border border-[#00d4d4]/30 text-[#00d4d4] hover:bg-[#00d4d4]/10 rounded-lg transition-colors text-sm font-medium relative z-10">
                                        Manage
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
