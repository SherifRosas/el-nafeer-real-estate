'use client'

import { useState } from 'react'
import { useLanguage } from '../LanguageContext'
import Image from 'next/image'

interface Property {
    id: string
    title: string
    titleAr?: string
    location: string
    locationAr?: string
    price: number
    status: string
    images?: string[]
}

export default function PropertyGrid({ properties: initialProperties, ownerId }: { properties: Property[], ownerId: string }) {
    const [properties, setProperties] = useState(initialProperties)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    const [formData, setFormData] = useState({
        title: '',
        titleAr: '',
        location: '',
        locationAr: '',
        price: '',
        type: 'apartment',
        description: '',
        descriptionAr: ''
    })

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    ownerId
                })
            })
            const data = await res.json()
            if (data.success) {
                setProperties([data.property, ...properties])
                setShowUploadModal(false)
                setFormData({ title: '', titleAr: '', location: '', locationAr: '', price: '', type: 'apartment', description: '', descriptionAr: '' })
            } else {
                alert(data.error)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {/* LIST NEW ASSET NODE */}
                <button
                    onClick={() => setShowUploadModal(true)}
                    className="h-[450px] border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.02] hover:bg-white/[0.05] hover:border-sahara-gold/30 transition-all duration-700 group flex flex-col items-center justify-center gap-8 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-sahara-gold/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="w-24 h-24 bg-sahara-gold/10 rounded-[2.5rem] flex items-center justify-center text-sahara-gold border border-sahara-gold/20 group-hover:scale-110 group-hover:bg-sahara-gold group-hover:text-black transition-all duration-700 shadow-[0_0_40px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.4)]">
                        <span className="text-5xl font-light">+</span>
                    </div>
                    <div className="text-center space-y-2 relative z-10">
                        <p className="font-black text-2xl italic uppercase text-white tracking-tighter">
                            {isArabic ? 'مزامنة_أصل_جديد' : 'SYNC_NEW_ASSET'}
                        </p>
                        <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.4em] robotic-digits">INITIATE_INVENTORY_PROTOCOL</p>
                    </div>
                </button>

                {properties.map((property) => (
                    <div
                        key={property.id}
                        className="milky-glass rounded-[4rem] overflow-hidden border border-white/5 hover:border-sahara-gold/40 transition-all duration-700 group relative shadow-[0_30px_80px_rgba(0,0,0,0.5)] h-[550px]"
                    >
                        {/* Image Hub */}
                        <div className="h-64 bg-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 flex items-center justify-center text-8xl grayscale opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000 pointer-events-none">
                                🏢
                            </div>

                            {/* Status Peripheral */}
                            <div className="absolute top-8 left-8 z-20">
                                <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] robotic-digits ${property.status === 'available' ? 'bg-sahara-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/10 text-gray-400'
                                    }`}>
                                    {property.status === 'available' ? (isArabic ? 'متاح' : 'ONLINE') : (isArabic ? 'مباع' : 'OFFLINE')}
                                </span>
                            </div>
                        </div>

                        {/* Inventory Context */}
                        <div className="p-10 space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white truncate leading-none group-hover:text-sahara-gold transition-colors duration-500">
                                    {isArabic ? (property.titleAr || property.title) : property.title}
                                </h3>
                                <p className="text-gray-500 font-bold text-xs uppercase tracking-tight flex items-center gap-3">
                                    <span className="text-sahara-gold">LOC_NODE:</span> {isArabic ? (property.locationAr || property.location) : property.location}
                                </p>
                            </div>

                            <div className="flex items-center justify-between border-y border-white/[0.03] py-8">
                                <div>
                                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mb-2 robotic-digits">VALUATION_CREDIT</p>
                                    <p className="text-3xl font-black text-white italic tracking-tighter shadow-sahara-gold/10">
                                        {property.price.toLocaleString()} <span className="text-lg text-sahara-gold">EGP</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mb-2 robotic-digits">AI_SIGNALS</p>
                                    <div className="flex items-center gap-3 justify-end">
                                        <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                                        <p className="text-sm font-black text-sahara-gold italic tracking-tighter">0 ACTIVE</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 py-5 rounded-3xl bg-white text-black font-black text-[10px] uppercase tracking-[0.5em] hover:bg-sahara-gold transition-all duration-500 active:scale-95 shadow-xl">
                                    {isArabic ? 'تعديل_البيانات' : 'EDIT_SCHEMA'}
                                </button>
                                <button className="w-16 h-16 rounded-3xl milky-glass text-white flex items-center justify-center text-2xl hover:bg-white/10 transition-all border border-white/10 shadow-2xl active:scale-95">
                                    📊
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Asset Synchronization Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
                    <div className="absolute inset-0" onClick={() => setShowUploadModal(false)} />
                    <div className="milky-glass border border-white/10 rounded-[5rem] p-16 w-full max-w-4xl relative z-10 shadow-[0_50px_150px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500 my-auto">
                        <div className="flex justify-between items-center mb-16 rtl:flex-row-reverse">
                            <div>
                                <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter mb-2">
                                    {isArabic ? <>مزامنة <span className="text-sahara-gold">أصل_جديد</span></> : <>SYNC_<span className="text-sahara-gold">NEW_ASSET</span></>}
                                </h2>
                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em] robotic-digits">ASSET_MAPPING_PROTOCOL_v3.5</p>
                            </div>
                            <button onClick={() => setShowUploadModal(false)} className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-3xl hover:bg-sahara-gold hover:text-black transition-all">✕</button>
                        </div>

                        <form className="space-y-12" onSubmit={handleUpload}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-6 robotic-digits">{isArabic ? 'عنوان_الأصل' : 'ASSET_IDENTIFIER'}</label>
                                    <input
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all"
                                        placeholder="Villa Sahara Gold..."
                                        title={isArabic ? 'العنوان' : 'Asset Identifier'}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-6 robotic-digits">{isArabic ? 'العنوان بالعربي' : 'ARABIC_IDENTIFIER'}</label>
                                    <input
                                        value={formData.titleAr}
                                        onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all text-right"
                                        placeholder="فيلا صحارى جولد..."
                                        title={isArabic ? 'العنوان بالعربي' : 'Arabic Identifier'}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-6 robotic-digits">{isArabic ? 'الموقع' : 'LOCATION_NODE'}</label>
                                    <input
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all"
                                        placeholder="New Cairo, District 5..."
                                        title={isArabic ? 'الموقع' : 'Location Node'}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-6 robotic-digits">{isArabic ? 'القيمة_التقديرية' : 'VALUATION_CREDIT'}</label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all robotic-digits"
                                        placeholder="7500000"
                                        title={isArabic ? 'السعر' : 'Valuation Credit'}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-6 robotic-digits">{isArabic ? 'بيانات_الأصل' : 'ASSET_DESCRIPTION'}</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-[3rem] px-10 py-8 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all h-40 resize-none"
                                    placeholder="Enter premium asset details..."
                                    title={isArabic ? 'الوصف' : 'Asset Description'}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-10 pt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowUploadModal(false)}
                                    className="py-8 rounded-[3rem] bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.8em] transition-all hover:bg-white/10"
                                >
                                    {isArabic ? 'إلغاء' : 'ABORT'}
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="py-8 rounded-[3rem] bg-sahara-gold text-black font-black text-[11px] uppercase tracking-[0.8em] shadow-[0_30px_60px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {loading ? (isArabic ? 'جاري_المزامنة...' : 'SYNCING...') : (isArabic ? 'تنفيذ_المزامنة' : 'EXECUTE_SYNC')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
