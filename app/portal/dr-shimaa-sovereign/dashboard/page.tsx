'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Clock, Users, LogOut, CheckCircle, Save } from 'lucide-react'

const DASHBOARD_PASSWORD = "01224576070#SH";

export default function DrShimaaDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [authError, setAuthError] = useState(false);

    const [workingHours, setWorkingHours] = useState({ start: "13:30", end: "20:30" });
    const [savingSettings, setSavingSettings] = useState(false);
    
    const [leads, setLeads] = useState<any[]>([]);
    const [loadingLeads, setLoadingLeads] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchSettings();
            fetchLeads();
        }
    }, [isAuthenticated]);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/dr-shimaa-settings');
            const data = await res.json();
            if (data.workingHours) setWorkingHours(data.workingHours);
        } catch (error) {
            console.error("Failed to fetch settings", error);
        }
    };

    const fetchLeads = async () => {
        setLoadingLeads(true);
        try {
            const res = await fetch('/api/dr-shimaa-leads');
            const data = await res.json();
            if (data.leads) setLeads(data.leads);
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoadingLeads(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === DASHBOARD_PASSWORD) {
            setIsAuthenticated(true);
            setAuthError(false);
        } else {
            setAuthError(true);
        }
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingSettings(true);
        try {
            await fetch('/api/dr-shimaa-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workingHours)
            });
            alert("تم حفظ المواعيد بنجاح! (Settings Saved)");
        } catch (error) {
            alert("حدث خطأ أثناء الحفظ (Error saving settings)");
        } finally {
            setSavingSettings(false);
        }
    };

    const parseNotes = (notes: string) => {
        // [SHIMAA_CLINICAL_PORTAL] Service: ... | Visit Date: ... | Time: ... | GPS Location: ... | Notes: ...
        const details = notes.replace('[SHIMAA_CLINICAL_PORTAL]', '').split(' | ');
        return details.map(d => d.trim());
    };

    if (!isAuthenticated) {
        return (
            <div className="w-screen h-screen bg-black flex flex-col items-center justify-center font-sans">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-sky-950/20 border border-sky-500/30 rounded-3xl backdrop-blur-md shadow-[0_0_50px_rgba(14,165,233,0.1)] w-full max-w-sm flex flex-col gap-6"
                >
                    <div className="flex justify-center text-sky-400 mb-4">
                        <Shield size={48} />
                    </div>
                    <h1 className="text-xl font-black text-white text-center tracking-widest uppercase">
                        Sovereign Admin
                    </h1>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className={`w-full bg-black border ${authError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-sky-400'} p-4 rounded-xl text-white outline-none text-center tracking-widest transition-all`}
                        />
                        {authError && <p className="text-red-400 text-xs text-center font-bold">Access Denied</p>}
                        <button type="submit" className="w-full bg-sky-500 hover:bg-white text-black font-black uppercase tracking-widest p-4 rounded-xl transition-all">
                            Authenticate
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans p-4 md:p-8 selection:bg-sky-500/30" dir="rtl">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-sky-400 tracking-wide">
                            لوحة تحكم الدكتورة شيماء
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Sovereign Clinical Dashboard</p>
                    </div>
                    <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors">
                        <LogOut size={18} />
                        <span className="hidden md:inline font-bold text-xs uppercase tracking-widest">Logout</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Settings Panel */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <div className="bg-white/5 border border-sky-500/20 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
                            <div className="flex items-center gap-3 text-sky-400 mb-6">
                                <Clock size={24} />
                                <h2 className="text-lg font-bold">مواعيد العيادة</h2>
                            </div>
                            <form onSubmit={handleSaveSettings} className="flex flex-col gap-4">
                                <div>
                                    <label className="text-xs text-gray-400 font-bold mb-2 block">وقت البدء (Start Time)</label>
                                    <input 
                                        type="time" 
                                        value={workingHours.start}
                                        onChange={(e) => setWorkingHours({...workingHours, start: e.target.value})}
                                        required
                                        className="w-full bg-black border border-white/10 p-3 rounded-xl text-white outline-none focus:border-sky-400 transition-colors"
                                        dir="ltr"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 font-bold mb-2 block">وقت الانتهاء (End Time)</label>
                                    <input 
                                        type="time" 
                                        value={workingHours.end}
                                        onChange={(e) => setWorkingHours({...workingHours, end: e.target.value})}
                                        required
                                        className="w-full bg-black border border-white/10 p-3 rounded-xl text-white outline-none focus:border-sky-400 transition-colors"
                                        dir="ltr"
                                    />
                                </div>
                                <button disabled={savingSettings} type="submit" className="w-full bg-sky-500 hover:bg-sky-400 text-black font-black flex items-center justify-center gap-2 p-3 rounded-xl transition-all mt-2 disabled:opacity-50">
                                    <Save size={16} />
                                    حفظ المواعيد
                                </button>
                                <p className="text-[10px] text-gray-500 text-center mt-2">
                                    المواعيد ستتاح للمرضى كل 15 دقيقة تلقائياً.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Leads Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 border border-sky-500/20 rounded-3xl p-6 shadow-xl backdrop-blur-sm h-full min-h-[500px]">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3 text-sky-400">
                                    <Users size={24} />
                                    <h2 className="text-lg font-bold">الحجوزات والمرضى ({leads.length})</h2>
                                </div>
                                <button onClick={fetchLeads} className="text-xs font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                                    تحديث
                                </button>
                            </div>

                            {loadingLeads ? (
                                <div className="flex justify-center items-center h-64 text-sky-400 animate-pulse">
                                    جاري التحميل...
                                </div>
                            ) : leads.length === 0 ? (
                                <div className="flex flex-col justify-center items-center h-64 text-white/30 text-center gap-4">
                                    <CheckCircle size={48} className="opacity-20" />
                                    <p>لا يوجد حجوزات بعد.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                    {leads.map((lead) => (
                                        <div key={lead.id} className="bg-black/50 border border-white/10 rounded-2xl p-5 hover:border-sky-500/30 transition-colors">
                                            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                                                <div>
                                                    <h3 className="text-lg font-black text-white">{lead.name}</h3>
                                                    <p className="text-sky-400 font-bold mt-1 dir-ltr">{lead.phone}</p>
                                                    <span className="text-[10px] text-gray-500 mt-2 block">
                                                        {new Date(lead.createdAt).toLocaleString('ar-EG')}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-2 bg-white/5 p-3 rounded-xl text-sm w-full md:w-1/2">
                                                    {parseNotes(lead.notes || '').map((note, i) => (
                                                        <div key={i} className="text-gray-300 border-b border-white/5 pb-1 last:border-0 last:pb-0">
                                                            {note}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.3); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(14,165,233,0.5); }
                .dir-ltr { direction: ltr; display: inline-block; }
            `}} />
        </div>
    );
}
