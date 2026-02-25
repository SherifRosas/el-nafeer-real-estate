'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import MasterCampaignsContent from '@/components/admin/MasterCampaignsContent'

interface Campaign {
    id: string
    name: string
    description?: string
    type: string
    platforms: string[]
    status: string
    scheduleType: string
    startDate?: string
    executions?: any[]
}

interface Property {
    id: string
    title: string
    property_owners?: {
        companyName: string
    }
}

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    const [form, setForm] = useState({
        name: '',
        type: 'social_post',
        platforms: [] as string[],
        propertyId: '',
        description: ''
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [cRes, pRes] = await Promise.all([
                fetch('/api/campaigns'),
                fetch('/api/properties?all=true')
            ])
            const [cData, pData] = await Promise.all([cRes.json(), pRes.json()])

            if (cData.success) setCampaigns(cData.campaigns || [])
            if (pData.success) setProperties(pData.properties || [])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (form.platforms.length === 0) {
            alert(isArabic ? 'يرجى اختيار منصة واحدة على الأقل' : 'Please select at least one platform')
            return
        }

        setIsSubmitting(true)
        try {
            const res = await fetch('/api/campaigns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    scheduleType: 'once',
                    autoGenerate: true
                })
            })
            const data = await res.json()
            if (data.success) {
                setCampaigns([data.campaign, ...campaigns])
                setShowCreateModal(false)
                setForm({ name: '', type: 'social_post', platforms: [], propertyId: '', description: '' })
            } else {
                alert(data.error)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const togglePlatform = (p: string) => {
        if (form.platforms.includes(p)) {
            setForm({ ...form, platforms: form.platforms.filter(x => x !== p) })
        } else {
            setForm({ ...form, platforms: [...form.platforms, p] })
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020202] flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-t-2 border-sahara-gold rounded-full animate-spin" />
                    <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.6em] robotic-digits animate-pulse">
                        {isArabic ? 'جارى_استرجاع_بيانات_الترويج...' : 'SYNCHRONIZING_MARKETING_CRYSTAL...'}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <MasterCampaignsContent
                initialCampaigns={campaigns}
                onCreateRequest={() => setShowCreateModal(true)}
            />

            {/* Elite Create Campaign Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
                    <div className="absolute inset-0" onClick={() => setShowCreateModal(false)} />
                    <div className="milky-glass border border-white/10 rounded-[4rem] p-16 w-full max-w-2xl relative z-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-500 my-auto">
                        <div className="flex justify-between items-center mb-12 rtl:flex-row-reverse">
                            <h2 className="text-4xl font-black italic uppercase text-white truncate">
                                {isArabic ? (
                                    <>بدء_بروتوكول <span className="text-sahara-gold">الترويج</span></>
                                ) : (
                                    <>INITIATE_PROMOTION_<span className="text-sahara-gold">PROTOCOL</span></>
                                )}
                            </h2>
                            <button onClick={() => setShowCreateModal(false)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl hover:bg-sahara-gold hover:text-black transition-all">✕</button>
                        </div>

                        <form className="space-y-10" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">
                                    {isArabic ? 'اسم_الحملة_الرئيسي' : 'MASTER_CAMPAIGN_ID'}
                                </label>
                                <input
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-5 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all"
                                    placeholder={isArabic ? 'أدخل_اسم_الحملة...' : 'ENTER_CAMPAIGN_NAME...'}
                                    title={isArabic ? 'اسم الحملة' : 'Campaign Name'}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">
                                        {isArabic ? 'طيف_البث' : 'BROADCAST_SPECTRUM'}
                                    </label>
                                    <select
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-5 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all appearance-none cursor-pointer"
                                        title={isArabic ? 'نوع الحملة' : 'Campaign Type'}
                                    >
                                        <option value="social_post">{isArabic ? 'منشور_شبكات_اجتماعية' : 'SOCIAL_FIELD'}</option>
                                        <option value="email_campaign">{isArabic ? 'بث_بريد_إلكتروني' : 'EMAIL_BURST'}</option>
                                        <option value="multi_channel">{isArabic ? 'نشر_متعدد_القنوات' : 'OMNI_CHANNEL'}</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">
                                        {isArabic ? 'الأصل_المستهدف' : 'TARGET_ASSET'}
                                    </label>
                                    <select
                                        required
                                        value={form.propertyId}
                                        onChange={(e) => setForm({ ...form, propertyId: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-3xl px-8 py-5 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all appearance-none cursor-pointer"
                                        title={isArabic ? 'الأصل المستهدف' : 'Target Asset'}
                                    >
                                        <option value="">{isArabic ? '--- اختيار الأصل ---' : '--- CHOOSE ASSET ---'}</option>
                                        {properties.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.title} ({p.property_owners?.companyName || 'N/A'})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">
                                    {isArabic ? 'القنوات_المفعلة' : 'ACTIVE_CHANNELS'}
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {['facebook', 'linkedin', 'whatsapp', 'email'].map(p => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => togglePlatform(p)}
                                            className={`px-6 py-3 rounded-2xl border text-[9px] font-black uppercase tracking-widest transition-all ${form.platforms.includes(p)
                                                    ? 'bg-sahara-gold text-black border-sahara-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                                                    : 'bg-white/5 border-white/5 text-gray-600 hover:border-white/20'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-10">
                                <button type="button" className="py-8 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.6em] transition-all hover:bg-white/10" onClick={() => setShowCreateModal(false)}>
                                    {isArabic ? 'إجهاض' : 'ABORT'}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="py-8 rounded-3xl bg-sahara-gold text-black font-black text-[10px] uppercase tracking-[0.6em] shadow-[0_15px_30px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? (isArabic ? 'جاري_التنفيذ...' : 'EXECUTING...') : (isArabic ? 'نشر_البروتوكول' : 'DEPLOY_PROTOCOL')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
