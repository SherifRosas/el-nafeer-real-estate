'use client'

import { useLanguage } from '../LanguageContext'
import { useState, useEffect } from 'react'
import { supabase, TABLES } from '@/lib/supabase'

interface Transaction {
    id: string
    amount: number
    paymentDate: string
    status: string
    applicationId?: string
}

interface FinanceProps {
    transactions: Transaction[]
    totalRevenue: number
}

export default function MasterFinanceContent({ transactions: initialTransactions, totalRevenue: initialRevenue }: FinanceProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [transactions, setTransactions] = useState(initialTransactions)
    const [totalRevenue, setTotalRevenue] = useState(initialRevenue)

    useEffect(() => {
        const revenueChannel = supabase
            .channel('public:revenue')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: TABLES.revenue }, (payload) => {
                const newRevenue = payload.new as Transaction
                setTransactions(prev => [newRevenue, ...prev])
                setTotalRevenue(prev => prev + newRevenue.amount)
            })
            .subscribe()

        return () => {
            supabase.removeChannel(revenueChannel)
        }
    }, [])

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Financial Status Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
                        {isArabic ? (
                            <>الخزينة <span className="text-sahara-gold">العالمية</span></>
                        ) : (
                            <>GLOBAL_<span className="text-sahara-gold">TREASURY</span></>
                        )}
                    </h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
                        {isArabic ? 'مراقبة_التدفقات_النقدية_والسيولة_العامة' : 'MONITORING_CASH_FLOW_AND_GLOBAL_LIQUIDITY'}
                    </p>
                </div>
                <div className="milky-glass rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-sahara-gold/[0.05] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] mb-2 robotic-digits leading-none">
                        {isArabic ? 'إجمالي_رأس_المال' : 'TOTAL_CAPITAL_POOL'}
                    </p>
                    <p className="text-5xl font-black text-sahara-gold robotic-digits">
                        {totalRevenue.toLocaleString()} <span className="text-sm">EGP</span>
                    </p>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="milky-glass rounded-[3.5rem] p-12 border border-white/10 relative overflow-hidden group">
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em] mb-4 robotic-digits">{isArabic ? 'معدل_النمو' : 'GROWTH_RATE'}</p>
                    <h4 className="text-4xl font-black text-white italic robotic-digits">+24.8%</h4>
                    <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-sahara-gold w-[70%]" />
                    </div>
                </div>
                <div className="milky-glass rounded-[3.5rem] p-12 border border-white/10 relative overflow-hidden group">
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em] mb-4 robotic-digits">{isArabic ? 'حجم_المعاملات' : 'TXN_VOLUME'}</p>
                    <h4 className="text-4xl font-black text-white italic robotic-digits">{transactions.length}</h4>
                    <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-sahara-gold w-[45%]" />
                    </div>
                </div>
                <div className="milky-glass rounded-[3.5rem] p-12 border border-white/10 relative overflow-hidden group">
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em] mb-4 robotic-digits">{isArabic ? 'كفاءة_العائد' : 'ROI_EFFICIENCY'}</p>
                    <h4 className="text-4xl font-black text-sahara-gold italic robotic-digits">98.2%</h4>
                    <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-sahara-gold w-[98%]" />
                    </div>
                </div>
            </div>

            {/* Transaction Ledger */}
            <div className="milky-glass rounded-[4.5rem] border border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                <div className="p-12 border-b border-white/5 flex items-center justify-between rtl:flex-row-reverse">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                        {isArabic ? 'دفتر_المعاملات_الرئيسي' : 'MASTER_TXN_LEDGER'}
                    </h3>
                    <div className="flex gap-4">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)]" />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest robotic-digits">ENCRYPTED_FEED_ACTIVE</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.02] bg-white/[0.01]">
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'المعرف' : 'TXN_ID'}</th>
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'المبلغ' : 'AMOUNT'}</th>
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'التاريخ' : 'TIMESTAMP'}</th>
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'الحالة' : 'STATUS'}</th>
                                <th className="p-10 text-[10px] font-black text-gray-700 uppercase tracking-[0.3em] robotic-digits">{isArabic ? 'إجراء' : 'ACTION'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center text-gray-700 font-black uppercase tracking-[0.5em] italic">
                                        {isArabic ? 'لا_توجد_معاملات_مرصودة' : 'NO_TRANSACTIONS_DETECTED'}
                                    </td>
                                </tr>
                            ) : (
                                transactions.map(txn => (
                                    <tr key={txn.id} className="hover:bg-white/[0.02] transition-all group">
                                        <td className="p-10 text-xs font-black text-gray-500 robotic-digits uppercase">
                                            #{txn.id.slice(-8)}
                                        </td>
                                        <td className="p-10">
                                            <span className="text-xl font-black text-white italic robotic-digits">
                                                {txn.amount.toLocaleString()} <span className="text-[10px] text-gray-600">EGP</span>
                                            </span>
                                        </td>
                                        <td className="p-10 text-xs font-bold text-gray-500 uppercase tracking-tighter robotic-digits">
                                            {new Date(txn.paymentDate).toLocaleString(isArabic ? 'ar-EG' : 'en-US')}
                                        </td>
                                        <td className="p-10">
                                            <span className="px-5 py-2 rounded-full bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-[0.2em] border border-green-500/20 robotic-digits">
                                                {txn.status || (isArabic ? 'مكتمل' : 'SETTLED')}
                                            </span>
                                        </td>
                                        <td className="p-10">
                                            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-sahara-gold hover:text-black transition-all">
                                                {isArabic ? 'تحميل' : 'RECEIPT'}
                                            </button>
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
