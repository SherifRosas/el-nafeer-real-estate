'use client'

import { useLanguage } from '../LanguageContext'
import Link from 'next/link'
import ApplicationActions from '../ApplicationActions'

interface Application {
    id: string
    fullName: string
    user: { email: string } | null
    aiVerified: boolean
    paymentStatus: string
    selectionStatus: string
    appointment: any | null
    createdAt: string
}

interface MasterApplicationsContentProps {
    applications: Application[]
    filterStatus: string
}

export default function MasterApplicationsContent({ applications, filterStatus }: MasterApplicationsContentProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Applications Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
                        {isArabic ? (
                            <>فرز <span className="text-sahara-gold">الطلبات</span></>
                        ) : (
                            <>APPLICATION_<span className="text-sahara-gold">SCRUTINY</span></>
                        )}
                    </h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
                        {isArabic ? 'تحليل_وفلترة_طلبات_المستخدمين_العالمية' : 'ANALYSIS_AND_FILTRATION_OF_GLOBAL_USER_SIGNALS'}
                    </p>
                </div>
                <div className="flex gap-4 p-4 milky-glass rounded-3xl border border-white/5 rtl:flex-row-reverse">
                    <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest robotic-digits">{applications.length} TOTAL_SIGNALS</span>
                </div>
            </div>

            {/* Filter Hub */}
            <div className="flex flex-wrap items-center justify-between gap-10 px-8 rtl:flex-row-reverse">
                <div className="space-y-2 text-center md:text-left rtl:md:text-right">
                    <h3 className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] robotic-digits leading-none">
                        {isArabic ? 'تصفية_حسب_البروتوكول' : 'PROTOCOL_STATUS_FILTER'}
                    </h3>
                </div>
                <div className="flex flex-wrap gap-4 p-2 milky-glass rounded-[2rem] border border-white/5 rtl:flex-row-reverse">
                    {[
                        { label: isArabic ? 'الكل' : 'ALL', value: 'all' },
                        { label: isArabic ? 'قيد الانتظار' : 'PENDING', value: 'pending' },
                        { label: isArabic ? 'تم الاختيار' : 'SELECTED', value: 'selected' },
                        { label: isArabic ? 'مرفوض' : 'REJECTED', value: 'rejected' },
                    ].map((item) => {
                        const isActive = filterStatus === item.value
                        return (
                            <Link
                                key={item.value}
                                href={item.value === 'all' ? '/admin/master/applications' : `/admin/master/applications?status=${item.value}`}
                                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive
                                    ? 'bg-sahara-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Intelligence Ledger */}
            <div className="milky-glass rounded-[4.5rem] border border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.02] bg-white/[0.01]">
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'الاسم' : 'IDENTIFIER'}</th>
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'الذكاء' : 'AI_INTEL'}</th>
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'الدفع' : 'CREDIT'}</th>
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'الحالة' : 'PROTOCOL'}</th>
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'إجراء' : 'EXECUTE'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {applications.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center text-gray-700 font-black uppercase tracking-[0.5em] italic">
                                        {isArabic ? 'لا_توجد_إشارات_مرصودة' : 'NO_SIGNALS_DETECTED_IN_SECTOR'}
                                    </td>
                                </tr>
                            ) : (
                                applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-white/[0.02] transition-all group">
                                        <td className="p-10">
                                            <p className="text-xl font-black text-white italic truncate">{app.fullName}</p>
                                            <p className="text-[10px] text-gray-600 font-bold robotic-digits lowercase mt-1 opacity-60">{app.user?.email || 'N/A'}</p>
                                        </td>
                                        <td className="p-10">
                                            <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest robotic-digits ${app.aiVerified ? 'bg-sahara-gold/10 text-sahara-gold border border-sahara-gold/20' : 'bg-white/5 text-gray-500'}`}>
                                                {app.aiVerified ? (isArabic ? 'تم_التحقق' : 'VERIFIED') : (isArabic ? 'معلق' : 'PENDING')}
                                            </span>
                                        </td>
                                        <td className="p-10">
                                            <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest robotic-digits ${app.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                                {app.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="p-10">
                                            <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest robotic-digits ${app.selectionStatus === 'selected' ? 'bg-sahara-gold text-black shadow-lg' :
                                                app.selectionStatus === 'rejected' ? 'bg-white/5 text-gray-700' : 'bg-white/5 text-white/40'
                                                }`}>
                                                {app.selectionStatus}
                                            </span>
                                        </td>
                                        <td className="p-10">
                                            <ApplicationActions application={{
                                                id: app.id,
                                                fullName: app.fullName,
                                                user: { email: app.user?.email || 'N/A' },
                                                paymentStatus: app.paymentStatus || 'pending',
                                                selectionStatus: app.selectionStatus || 'pending',
                                            }} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
