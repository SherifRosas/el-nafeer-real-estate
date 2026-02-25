'use client'

import { useLanguage } from '../LanguageContext'
import { useState } from 'react'
import { db } from '@/lib/supabase'

interface Settings {
    bankAccountNumber: string
    bankName: string
    bankDetails: string
    advertisementStatus: string
    adminGmail: string
    canReactivate: boolean
}

export default function MasterSettingsContent({ initialSettings }: { initialSettings: Settings }) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [settings, setSettings] = useState(initialSettings)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState('')

    const handleSave = async () => {
        setIsSaving(true)
        setMessage('')
        try {
            await db.updateSettings(settings)
            setMessage(isArabic ? '✅ تم حفظ الإعدادات بنجاح' : '✅ Settings synchronized successfully')
        } catch (error) {
            console.error(error)
            setMessage(isArabic ? '❌ خطأ في مزامنة البيانات' : '❌ Error synchronizing nexus')
        } finally {
            setIsSaving(false)
            setTimeout(() => setMessage(''), 3000)
        }
    }

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Settings Header */}
            <div className="px-8 flex flex-col md:flex-row md:items-end justify-between gap-10 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
                        {isArabic ? (
                            <>رابط <span className="text-sahara-gold">النظام</span></>
                        ) : (
                            <>SYSTEM_<span className="text-sahara-gold">NEXUS</span></>
                        )}
                    </h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
                        {isArabic ? 'تكوين_معاملات_المنصة_العالمية' : 'CONFIGURE_GLOBAL_PLATFORM_OVERRIDE_PARAMETERS'}
                    </p>
                </div>
                <div className="flex gap-4 p-4 milky-glass rounded-3xl border border-white/5 rtl:flex-row-reverse">
                    <span className="w-2 h-2 bg-sahara-gold rounded-full animate-ping" />
                    <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] robotic-digits">CORE_LINK_STABLE</span>
                </div>
            </div>

            {/* Config Nodes */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {/* Protocol Alpha: System Status */}
                <div className="milky-glass rounded-[4rem] p-12 border border-white/10 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sahara-gold/[0.02] blur-[80px]" />
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4 text-white rtl:flex-row-reverse">
                        <span className="w-10 h-10 rounded-xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sm italic shadow-lg">α</span>
                        {isArabic ? 'بروتوكول_الحالة' : 'PROTOCOL_ALPHA_STATUS'}
                    </h3>
                    <div className="space-y-10">
                        <div className="flex items-center justify-between p-6 rounded-3xl bg-black/40 border border-white/5 hover:border-sahara-gold/30 transition-all group/item rtl:flex-row-reverse">
                            <div>
                                <h4 className="font-black text-white italic uppercase tracking-tight mb-1">{isArabic ? 'وضع_الإعلانات' : 'AD_PROTOCOL_MODE'}</h4>
                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest robotic-digits">{settings.advertisementStatus === 'open' ? 'BROADCASTING_ACTIVE' : 'SYSTEM_OFFLINE'}</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, advertisementStatus: settings.advertisementStatus === 'open' ? 'closed' : 'open' })}
                                className={`w-20 h-10 rounded-full p-1 transition-all duration-500 relative ${settings.advertisementStatus === 'open' ? 'bg-sahara-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/10'}`}
                            >
                                <div className={`w-8 h-8 rounded-full bg-white shadow-xl transition-all duration-500 transform ${settings.advertisementStatus === 'open' ? (isArabic ? '-translate-x-10' : 'translate-x-10') : 'translate-x-0'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-6 rounded-3xl bg-black/40 border border-white/5 hover:border-sahara-gold/30 transition-all group/item rtl:flex-row-reverse">
                            <div>
                                <h4 className="font-black text-white italic uppercase tracking-tight mb-1">{isArabic ? 'إعادة_التفعيل_الذاتي' : 'AUTO_REACTIVATION'}</h4>
                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest robotic-digits">{settings.canReactivate ? 'AUTONOMOUS_ENABLED' : 'MANUAL_OVERRIDE_ONLY'}</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, canReactivate: !settings.canReactivate })}
                                className={`w-20 h-10 rounded-full p-1 transition-all duration-500 relative ${settings.canReactivate ? 'bg-sahara-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/10'}`}
                            >
                                <div className={`w-8 h-8 rounded-full bg-white shadow-xl transition-all duration-500 transform ${settings.canReactivate ? (isArabic ? '-translate-x-10' : 'translate-x-10') : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Protocol Beta: Financial Nexus */}
                <div className="milky-glass rounded-[4rem] p-12 border border-white/10 relative overflow-hidden group shadow-2xl">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sahara-gold/[0.02] blur-[80px]" />
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4 text-white rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                        <span className="w-10 h-10 rounded-xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sm italic shadow-lg">β</span>
                        {isArabic ? 'الرابط_المالي' : 'PROTOCOL_BETA_FINANCE'}
                    </h3>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">{isArabic ? 'رقم_الحساب_النخبوي' : 'ELITE_ACCOUNT_ID'}</label>
                            <input
                                value={settings.bankAccountNumber}
                                onChange={(e) => setSettings({ ...settings, bankAccountNumber: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-5 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all robotic-digits"
                                placeholder="X-777-ALPHA-XXXX"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">{isArabic ? 'نواة_البنك_الرئيسي' : 'MASTER_BANK_CORE'}</label>
                            <input
                                value={settings.bankName}
                                onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-5 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all"
                                placeholder="CENTRAL_ORCHESTRATION_RE"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Communication Node */}
            <div className="milky-glass rounded-[4.5rem] p-12 border border-white/10 relative overflow-hidden group shadow-2xl">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4 text-white rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                    <span className="w-10 h-10 rounded-xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sm italic shadow-lg">γ</span>
                    {isArabic ? 'نقطة_الاتصال_الرئيسية' : 'PROTOCOL_GAMMA_COMMS'}
                </h3>
                <div className="max-w-3xl space-y-3">
                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">{isArabic ? 'معرف_المسؤول_جي_ميل' : 'ADMIN_MASTER_GMAIL'}</label>
                    <input
                        value={settings.adminGmail}
                        onChange={(e) => setSettings({ ...settings, adminGmail: e.target.value })}
                        className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-5 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all robotic-digits"
                        placeholder="master.admin@nexus.ai"
                    />
                </div>
            </div>

            {/* Execution Bar */}
            <div className="sticky bottom-10 z-20 flex justify-center">
                <div className="milky-glass rounded-full border border-white/10 p-2 flex items-center gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] px-10">
                    {message && (
                        <p className="text-[10px] font-black uppercase tracking-widest text-sahara-gold animate-in fade-in slide-in-from-bottom-2">
                            {message}
                        </p>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-12 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.6em] rounded-full hover:bg-sahara-gold hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
                    >
                        {isSaving ? (isArabic ? 'قيد_المزامنة...' : 'SYNCING_NEXUS...') : (isArabic ? 'تنشيط_البروتوكولات' : 'ACTIVATE_PROTOCOLS')}
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-sahara-gold/30" />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
