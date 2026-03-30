"use client";

import { useState } from "react";
import { User, Bell, Briefcase, CreditCard, Users, Loader2, Check, X, ShieldCheck } from "lucide-react";

export default function RecruiterSettings() {
    const [activeTab, setActiveTab] = useState("company");
    const [isSaving, setIsSaving] = useState<string | null>(null);
    const [savedSection, setSavedSection] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Invite Modal State
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteName, setInviteName] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("Recruiter");
    const [isInviting, setIsInviting] = useState(false);

    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // Dynamic Team Management State
    const [teamMembers, setTeamMembers] = useState([
        { id: 1, name: "John Smith", email: "john@acme.com", role: "Owner" },
        { id: 2, name: "Sarah Connor", email: "sarah@acme.com", role: "Admin" },
        { id: 3, name: "Mike Tyson", email: "mike@acme.com", role: "Recruiter" },
    ]);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const handleSave = (section: string) => {
        setIsSaving(section);
        setTimeout(() => {
            setIsSaving(null);
            setSavedSection(section);

            // Trigger specific actions/toasts based on the button clicked
            if (section === "upgrade") {
                setShowPaymentModal(true);
            } else if (section === "cancel") {
                showToast("Cancellation request initiated. Please check your email.");
            } else if (section === "payment") {
                showToast("Opening secure billing portal...");
            } else if (section === "company" || section === "account") {
                showToast("Profile details updated successfully!");
            }

            setTimeout(() => setSavedSection(null), 2000);
        }, 800);
    };

    const submitInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteName.trim() || !inviteEmail.trim()) return;
        
        setIsInviting(true);
        setTimeout(() => {
            setIsInviting(false);
            setTeamMembers(prev => [...prev, { 
                id: Date.now(), 
                name: inviteName, 
                email: inviteEmail, 
                role: inviteRole 
            }]);
            setShowInviteModal(false);
            setInviteName("");
            setInviteEmail("");
            setInviteRole("Recruiter");
            showToast(`Invitation successfully sent to ${inviteEmail}!`);
        }, 1500);
    };

    const submitPayment = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setShowPaymentModal(false);
            showToast("Payment successful! Your subscription is now active.");
        }, 2000);
    };

    const removeMember = (id: number) => {
        setTeamMembers(teamMembers.filter(m => m.id !== id));
        showToast("Team member access revoked successfully.");
    };

    const tabs = [
        { id: "company", label: "Company Profile", icon: Briefcase },
        { id: "account", label: "Account Settings", icon: User },
        { id: "billing", label: "Billing & Plans", icon: CreditCard },
        { id: "team", label: "Team Members", icon: Users },
        { id: "notifications", label: "Notifications", icon: Bell },
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
        <div className="p-8 md:p-12 max-w-6xl mx-auto animate-in fade-in duration-500 relative">
            
            {/* Floating Toast Notification */}
            {toastMessage && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-[#00d4d4] text-[#030712] font-semibold px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(0,212,212,0.4)]">
                        <Check size={18} />
                        {toastMessage}
                        <button onClick={() => setToastMessage(null)} className="ml-2 hover:bg-black/10 rounded-full p-1 transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Invite Member Modal Overlay */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => !isInviting && setShowInviteModal(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-[#0d1722] border border-white/10 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#00d4d4] shadow-[0_0_20px_rgba(0,212,212,0.6)]" />
                        
                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-sora font-semibold text-white">Invite Team Member</h2>
                                <button 
                                    onClick={() => !isInviting && setShowInviteModal(false)}
                                    className="p-2 text-[#8a9ab0] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <form onSubmit={submitInvite} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#8a9ab0]">Full Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        disabled={isInviting}
                                        value={inviteName}
                                        onChange={(e) => setInviteName(e.target.value)}
                                        className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors disabled:opacity-50" 
                                        placeholder="e.g. Alex Johnson" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#8a9ab0]">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        disabled={isInviting}
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors disabled:opacity-50" 
                                        placeholder="alex@company.com" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#8a9ab0]">Role</label>
                                    <select 
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value)}
                                        disabled={isInviting}
                                        className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors appearance-none disabled:opacity-50"
                                    >
                                        <option value="Viewer">Viewer (Read-only)</option>
                                        <option value="Recruiter">Recruiter</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                
                                <div className="pt-4 flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setShowInviteModal(false)}
                                        disabled={isInviting}
                                        className="flex-1 px-4 py-3 bg-transparent border border-white/10 hover:bg-white/5 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isInviting}
                                        className="flex-[2] px-4 py-3 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)] disabled:opacity-70 flex justify-center items-center"
                                    >
                                        {isInviting ? (
                                            <><Loader2 className="animate-spin inline mr-2" size={18} /> Sending...</>
                                        ) : "Send Invitation"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal Overlay */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => !isProcessingPayment && setShowPaymentModal(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-[#0d1722] border border-white/10 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#00d4d4] shadow-[0_0_20px_rgba(0,212,212,0.6)]" />
                        
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h2 className="text-2xl font-sora font-semibold text-white">Upgrade to Pro</h2>
                                    <p className="text-[#8a9ab0] text-sm mt-1">Unlock advanced resume AI parsing.</p>
                                </div>
                                <button 
                                    onClick={() => !isProcessingPayment && setShowPaymentModal(false)}
                                    className="p-2 text-[#8a9ab0] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors shrink-0 outline-none"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-5 bg-[#00d4d4]/5 border border-[#00d4d4]/20 rounded-xl relative overflow-hidden flex items-center justify-between">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00d4d4]/10 blur-xl rounded-full" />
                                <div className="relative z-10">
                                    <p className="text-sm text-[#8a9ab0] font-medium uppercase tracking-wider mb-1">Total Amount</p>
                                    <p className="text-3xl font-sora font-bold text-white">$199<span className="text-xl text-white/50">/mo</span></p>
                                </div>
                                <ShieldCheck className="w-10 h-10 text-[#00d4d4] opacity-80" />
                            </div>
                            
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-white mb-2">Select Payment Method</p>
                                
                                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'card' ? 'bg-[#00d4d4]/10 border-[#00d4d4]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                    <input 
                                        type="radio" 
                                        name="payment_method" 
                                        className="accent-[#00d4d4] w-4 h-4"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                    />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span className="text-white font-medium">Credit Card</span>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-5 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                                            <div className="w-8 h-5 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-bold text-white">MC</div>
                                        </div>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'bg-[#00d4d4]/10 border-[#00d4d4]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                    <input 
                                        type="radio" 
                                        name="payment_method" 
                                        className="accent-[#00d4d4] w-4 h-4"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={() => setPaymentMethod('paypal')}
                                    />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span className="text-white font-medium">PayPal</span>
                                        <span className="text-blue-400 font-bold italic text-sm">PayPal</span>
                                    </div>
                                </label>
                                
                                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'crypto' ? 'bg-[#00d4d4]/10 border-[#00d4d4]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                    <input 
                                        type="radio" 
                                        name="payment_method" 
                                        className="accent-[#00d4d4] w-4 h-4"
                                        checked={paymentMethod === 'crypto'}
                                        onChange={() => setPaymentMethod('crypto')}
                                    />
                                    <div className="flex-1 flex justify-between items-center">
                                        <span className="text-white font-medium">Crypto (USDC / BTC)</span>
                                        <span className="text-yellow-400 font-bold text-sm">₿</span>
                                    </div>
                                </label>
                            </div>
                            
                            <button 
                                onClick={submitPayment}
                                disabled={isProcessingPayment}
                                className="w-full py-4 mt-4 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-sora font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,212,212,0.3)] disabled:opacity-70 flex justify-center items-center"
                            >
                                {isProcessingPayment ? (
                                    <><Loader2 className="animate-spin inline mr-2" size={18} /> Processing securely...</>
                                ) : (
                                    `Pay $199.00 via ${paymentMethod === 'card' ? 'Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Crypto'}`
                                )}
                            </button>
                            <p className="text-center text-xs text-[#54647a] mt-4 flex items-center justify-center gap-2">
                                <ShieldCheck size={12} /> SSL Secured Payment Processing
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" defaultValue="Acme Corp" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#8a9ab0]">Website URL</label>
                                    <input type="url" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" defaultValue="https://acme.com" />
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
                                    <textarea className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors h-28 resize-none" defaultValue="We are building the next generation of recruiting software." />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button 
                                    onClick={() => handleSave("company")}
                                    disabled={isSaving !== null}
                                    className={`px-6 py-2.5 font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)] w-full md:w-64 min-h-[44px] ${
                                        savedSection === "company" ? "bg-green-400 text-green-900 shadow-green-400/20" : "bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] disabled:opacity-70"
                                    }`}
                                >
                                    {renderButtonContent("company", "Save Company Details")}
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
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-[#8a9ab0]">Last Name</label>
                                    <input type="text" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d4d4]/50 transition-colors" defaultValue="Smith" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-[#8a9ab0]">Email Address</label>
                                    <input type="email" className="w-full bg-[#070d14] border border-white/5 rounded-xl px-4 py-3 text-[#54647a] cursor-not-allowed" value="john@acme.com" disabled />
                                    <p className="text-xs text-[#54647a] mt-1">To change your email, please contact support.</p>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button 
                                    onClick={() => handleSave("account")}
                                    disabled={isSaving !== null}
                                    className={`px-6 py-2.5 font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)] w-full md:w-64 min-h-[44px] ${
                                        savedSection === "account" ? "bg-green-400 text-green-900 shadow-green-400/20" : "bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] disabled:opacity-70"
                                    }`}
                                >
                                    {renderButtonContent("account", "Save Profile")}
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
                                    <div className="flex flex-col gap-3 shrink-0 min-w-[160px]">
                                        <button 
                                            onClick={() => handleSave("upgrade")}
                                            className="px-6 py-2.5 bg-[#00d4d4] hover:bg-[#00e5e5] text-[#030712] font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,212,0.2)] w-full text-center"
                                        >
                                            {isSaving === "upgrade" ? <Loader2 className="animate-spin mx-auto inline" size={18} /> : "Upgrade Plan"}
                                        </button>
                                        <button 
                                            onClick={() => handleSave("cancel")}
                                            className="px-6 py-2.5 bg-transparent border border-white/10 hover:bg-white/5 text-white font-medium rounded-xl transition-all w-full text-center"
                                        >
                                            {isSaving === "cancel" ? <Loader2 className="animate-spin mx-auto inline" size={18} /> : "Cancel Plan"}
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
                                    <button 
                                        onClick={() => handleSave("payment")}
                                        className="text-sm font-medium text-[#00d4d4] hover:text-[#00e5e5] transition-colors"
                                    >
                                        {isSaving === "payment" ? "Loading..." : "Edit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "team" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                                <h2 className="text-xl font-sora font-semibold text-white">Team Members</h2>
                                <button 
                                    onClick={() => setShowInviteModal(true)}
                                    className="px-4 py-2 bg-[#00d4d4]/10 text-[#00d4d4] border border-[#00d4d4]/30 hover:bg-[#00d4d4]/20 rounded-lg text-sm font-medium transition-colors"
                                >
                                    + Invite Member
                                </button>
                            </div>
                            <div className="space-y-3 relative">
                                {teamMembers.length === 0 && (
                                    <div className="text-center p-6 text-[#8a9ab0] bg-white/[0.02] rounded-xl border border-white/5">
                                        No team members found. Invite some!
                                    </div>
                                )}
                                {teamMembers.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
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
                                                <button 
                                                    onClick={() => removeMember(member.id)}
                                                    className="text-[#8a9ab0] hover:text-red-400 transition-colors text-sm font-medium"
                                                >
                                                    Remove
                                                </button>
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
                                    { id: "n1", title: "New Candidates", desc: "Get notified when new candidates match your job requirements.", defaultChecked: true },
                                    { id: "n2", title: "Candidate Messages", desc: "Alerts for new messages from candidates.", defaultChecked: true },
                                    { id: "n3", title: "Weekly Digest", desc: "A summary of hiring activities sent every Monday.", defaultChecked: false },
                                    { id: "n4", title: "Billing Alerts", desc: "Notifications about upcoming renewals or payment issues.", defaultChecked: true },
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
                                                onChange={() => {
                                                    setSavedSection(`notif_${item.id}`);
                                                    showToast("Preferences saved securely.");
                                                    setTimeout(() => setSavedSection(null), 2000);
                                                }}
                                            />
                                            <div className="w-11 h-6 bg-[#1a2634] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00d4d4]" />
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
