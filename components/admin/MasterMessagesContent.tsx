'use client'

import { useLanguage } from '@/components/LanguageContext'
import SendMessagesButton from '@/components/SendMessagesButton'

interface Message {
  id: string
  type: string
  status: string
  sentAt?: string
  createdAt: string
  content?: string
  user?: {
    email: string
  } | null
}

interface MasterMessagesContentProps {
  messages: Message[]
}

export default function MasterMessagesContent({ messages }: MasterMessagesContentProps) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sahara-gold/10 flex items-center justify-center text-2xl border border-sahara-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              📨
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
              {isArabic ? <>رسائل <span className="text-sahara-gold">النظام</span></> : <>SYSTEM_<span className="text-sahara-gold">COMMS</span></>}
            </h1>
          </div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.6em] robotic-digits">
            {isArabic ? 'سجل_بث_الرسائل_آلياً' : 'AUTOMATED_COMMUNICATION_LOGS'}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <SendMessagesButton />
        </div>
      </div>

      {/* Messages Table */}
      <div className="milky-glass border border-white/5 rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-10 py-8 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] robotic-digits">{isArabic ? 'النوع' : 'TYPE'}</th>
                <th className="px-10 py-8 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] robotic-digits">{isArabic ? 'المستلم' : 'RECIPIENT'}</th>
                <th className="px-10 py-8 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] robotic-digits">{isArabic ? 'الحالة' : 'STATUS'}</th>
                <th className="px-10 py-8 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] robotic-digits">{isArabic ? 'التوقيت' : 'TIMESTAMP'}</th>
                <th className="px-10 py-8 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] robotic-digits">{isArabic ? 'المحتوى' : 'CONTENT'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-gray-700 italic font-black uppercase tracking-widest text-[10px]">
                    {isArabic ? 'لا_توجد_رسائل_مسجلة' : 'NO_COMMUNICATIONS_RECORDED'}
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="group hover:bg-white/[0.02] transition-all duration-500">
                    <td className="px-10 py-8">
                      <span className="px-4 py-2 rounded-xl bg-sahara-gold/10 text-sahara-gold border border-sahara-gold/20 text-[9px] font-black uppercase tracking-widest">
                        {msg.type}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-black text-white italic truncate max-w-[200px]">{msg.user?.email || 'N/A'}</p>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.4)] ${
                          msg.status === 'sent' ? 'bg-green-500 shadow-green-500/40' : 
                          msg.status === 'failed' ? 'bg-red-500 shadow-red-500/40' : 
                          'bg-sahara-gold'
                        }`} />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest robotic-digits">{msg.status}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest robotic-digits">
                        {msg.sentAt ? new Date(msg.sentAt).toLocaleString() : new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{msg.content || '---'}</p>
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
