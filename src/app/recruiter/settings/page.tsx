"use client";

import { useState } from "react";
import { User, Bell, Briefcase, CreditCard, Users } from "lucide-react";

export default function RecruiterSettings() {
    const [activeTab, setActiveTab] = useState("company");

    const tabs = [
        { id: "company", label: "Company Profile", icon: Briefcase },
        { id: "account", label: "Account Settings", icon: User },
        { id: "billing", label: "Billing & Plans", icon: CreditCard },
        { id: "team", label: "Team Members", icon: Users },
        { id: "notifications", label: "Notifications", icon: Bell },
    ];

    return (
        <div className="p-8 md:p-12 max-w-6xl mx-auto animate-in fade-in duration-500">
            <header className="mb-10 lg:text-left text-center">
                <h1 className="text-3xl font-sora font-bold text-white mb-2">Workspace Settings</h1>
                <p className="text-[#8a9ab0]">Manage your company profile, billing, and team.</p>
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
                <div className="flex-1 bg-[#030712] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
                    {activeTab === "company" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-xl font-sora font-semibold text-white border-b border-white/5 pb-4">Company Profile</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-[#8a9ab0]">Company Name</label>
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" placeholder="Acme Corp" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#8a9ab0]">Website URL</label>
                                    <input type="url" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" placeholder="https://acme.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#8a9ab0]">Industry</label>
                                    <select className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors appearance-none">
                                        <option>Technology</option>
                                        <option>Healthcare</option>
                                        <option>Finance</option>
                                        <option>Education</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-[#8a9ab0]">Company Description</label>
                                    <textarea className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors h-28 resize-none" placeholder="We are building the next generation of..." />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button className="px-6 py-2.5 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)]">
                                    Save Company Details
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "account" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-xl font-sora font-semibold text-white border-b border-white/5 pb-4">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-[#8a9ab0]">First Name</label>
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#8a9ab0]">Last Name</label>
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" placeholder="Smith" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-[#8a9ab0]">Email Address</label>
                                    <input type="email" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-[#54647a] cursor-not-allowed" value="john@acme.com" disabled />
                                    <p className="text-xs text-[#54647a] mt-1">To change your email, please contact support.</p>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button className="px-6 py-2.5 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)]">
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "billing" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-xl font-sora font-semibold text-white border-b border-white/5 pb-4">Billing & Subscription</h2>
                            <div className="p-6 bg-[#00d4d4]/5 border border-[#00d4d4]/20 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4d4]/10 blur-3xl rounded-full" />
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#00d4d4]/20 text-[#00d4d4] rounded-full border border-[#00d4d4]/30">Active</span>
                                        </div>
                                        <p className="text-sm text-[#8a9ab0]">Access to AI candidate parsing and advanced analytics.</p>
                                        <p className="text-sm font-medium text-white mt-4">$199.00 / month (Renews Oct 12, 2026)</p>
                                    </div>
                                    <div className="flex flex-col gap-3 shrink-0">
                                        <button className="px-6 py-2.5 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)] w-full text-center">
                                            Upgrade Plan
                                        </button>
                                        <button className="px-6 py-2.5 bg-transparent border border-white/10 hover:bg-white/5 text-white font-medium rounded-xl transition-all w-full text-center">
                                            Cancel Plan
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-white">Payment Method</h3>
                                <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center border border-white/20">
                                            <span className="font-bold text-white text-xs">VISA</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-white text-sm">Visa ending in 4242</p>
                                            <p className="text-xs text-[#8a9ab0]">Expires 12/28</p>
                                        </div>
                                    </div>
                                    <button className="text-sm font-medium text-[#00d4d4] hover:text-[#00e5e5] transition-colors">Edit</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "team" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                                <h2 className="text-xl font-sora font-semibold text-white">Team Members</h2>
                                <button className="px-4 py-2 bg-[#00d4d4]/10 text-[#00d4d4] border border-[#00d4d4]/30 hover:bg-[#00d4d4]/20 rounded-lg text-sm font-medium transition-colors">
                                    + Invite Member
                                </button>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: "John Smith", email: "john@acme.com", role: "Owner" },
                                    { name: "Sarah Connor", email: "sarah@acme.com", role: "Admin" },
                                    { name: "Mike Tyson", email: "mike@acme.com", role: "Recruiter" },
                                ].map((member, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-sora font-semibold text-white uppercase text-sm">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium text-sm md:text-base">
                                                    {member.name} {member.role === 'Owner' && <span className="text-xs font-normal text-[#8a9ab0] ml-2">(You)</span>}
                                                </h4>
                                                <p className="text-xs md:text-sm text-[#8a9ab0]">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-medium px-2 py-1 bg-white/5 rounded text-[#8a9ab0]">{member.role}</span>
                                            {member.role !== 'Owner' && (
                                                <button className="text-[#8a9ab0] hover:text-red-400 transition-colors text-sm font-medium">Remove</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-xl font-sora font-semibold text-white border-b border-white/5 pb-4">Notification Preferences</h2>
                            <div className="space-y-3">
                                {[
                                    { title: "New Candidates", desc: "Get notified when new candidates match your job requirements.", defaultChecked: true },
                                    { title: "Candidate Messages", desc: "Alerts for new messages from candidates.", defaultChecked: true },
                                    { title: "Weekly Digest", desc: "A summary of hiring activities sent every Monday.", defaultChecked: false },
                                    { title: "Billing Alerts", desc: "Notifications about upcoming renewals or payment issues.", defaultChecked: true },
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
                </div>
            </div>
        </div>
    );
}
