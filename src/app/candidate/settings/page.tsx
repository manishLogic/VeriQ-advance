"use client";

import { useState } from "react";
import { User, Bell, Shield, Key, Loader2, Check } from "lucide-react";

export default function CandidateSettings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [isSaving, setIsSaving] = useState<string | null>(null);
    const [savedSection, setSavedSection] = useState<string | null>(null);

    const handleSave = (section: string) => {
        setIsSaving(section);
        setTimeout(() => {
            setIsSaving(null);
            setSavedSection(section);
            setTimeout(() => setSavedSection(null), 2000);
        }, 1200);
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
    ];

    const renderButtonContent = (section: string, defaultText: string) => {
        if (isSaving === section) return (
            <span className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" /> Saving...
            </span>
        );
        if (savedSection === section) return (
            <span className="flex items-center justify-center gap-2 text-green-700">
                <Check size={18} /> Saved successfully!
            </span>
        );
        return defaultText;
    };

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
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" defaultValue="Jane" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#8a9ab0]">Last Name</label>
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" defaultValue="Doe" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-[#8a9ab0]">Email Address</label>
                                    <input type="email" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-[#54647a] cursor-not-allowed" value="jane.doe@example.com" disabled />
                                    <p className="text-xs text-[#54647a] mt-1">To change your email, please contact support.</p>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-[#8a9ab0]">Professional Bio</label>
                                    <textarea className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors h-28 resize-none" defaultValue="I am a software engineer with 5 years of experience..." />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button 
                                    onClick={() => handleSave("profile")}
                                    disabled={isSaving !== null}
                                    className={`px-6 py-2.5 font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)] w-full md:w-64 min-h-[44px] ${
                                        savedSection === "profile" ? "bg-green-400 text-green-900 shadow-green-400/20" : "bg-[#00d4d4] hover:bg-[#00e5e5] text-[#070d14] disabled:opacity-70"
                                    }`}
                                >
                                    {renderButtonContent("profile", "Save Profile")}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-xl font-sora font-semibold text-white border-b border-white/5 pb-4">Notification Preferences</h2>
                            <div className="space-y-3">
                                {[
                                    { id: "t1", title: "Skill Test Results", desc: "Get notified when your skill tests are graded.", defaultChecked: true },
                                    { id: "t2", title: "Trust Score Updates", desc: "Receive alerts when your VeriQ Trust Score changes.", defaultChecked: true },
                                    { id: "t3", title: "Recruiter Views", desc: "Know when recruiters look at your verified profile.", defaultChecked: false },
                                    { id: "t4", title: "Product Updates", desc: "News regarding our platform features and updates.", defaultChecked: false },
                                ].map((item) => (
                                    <div key={item.id} className="flex items-start sm:items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors gap-4">
                                        <div>
                                            <h4 className="text-white font-medium text-sm md:text-base">{item.title}</h4>
                                            <p className="text-xs md:text-sm text-[#8a9ab0] mt-1">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                defaultChecked={item.defaultChecked} 
                                                onChange={() => handleSave(`notif_${item.id}`)}
                                            />
                                            <div className="w-11 h-6 bg-[#1a2634] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00d4d4]" />
                                        </label>
                                    </div>
                                ))}
                                <div className="pt-4 flex justify-end">
                                    <div className="text-sm text-[#00d4d4] opacity-0 transition-opacity" style={{ opacity: savedSection?.startsWith("notif_") ? 1 : 0 }}>
                                        Preferences saved locally
                                    </div>
                                </div>
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
                                    <button 
                                        onClick={() => handleSave("password")}
                                        className="w-full sm:w-auto px-4 py-2 mt-2 sm:mt-0 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-colors text-sm font-medium min-w-[140px]"
                                    >
                                        {isSaving === "password" ? <Loader2 className="animate-spin inline mr-2" size={14} /> : null}
                                        {isSaving === "password" ? "Sending Email..." : savedSection === "password" ? "Email Sent!" : "Update Password"}
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
                                    <button 
                                        onClick={() => handleSave("2fa")}
                                        className="w-full sm:w-auto px-4 py-2 mt-2 sm:mt-0 bg-transparent border border-[#00d4d4]/30 text-[#00d4d4] hover:bg-[#00d4d4]/10 rounded-lg transition-colors text-sm font-medium relative z-10 min-w-[100px]"
                                    >
                                        {isSaving === "2fa" ? <Loader2 className="animate-spin inline mr-2" size={14} /> : null}
                                        {isSaving === "2fa" ? "Loading..." : "Manage"}
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
