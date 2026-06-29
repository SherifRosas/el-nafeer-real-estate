'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, Activity, Calendar, FileText, Send, Sparkles, User, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function PatientEMRPage() {
    const params = useParams()
    const patientId = params.id as string

    const [patient, setPatient] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    
    // AI Chat State
    const [chatQuery, setChatQuery] = useState('')
    const [chatHistory, setChatHistory] = useState<{role: 'ai' | 'dr', text: string}[]>([
        { role: 'ai', text: 'أهلاً د. شيماء. أنا المساعد الطبي الذكي الخاص بك. قمت بتحليل السجل الطبي لهذه المريضة ويمكنني الإجابة على أي استفسار أو تقديم توصيات بناءً على الزيارات السابقة.' }
    ])
    const [aiThinking, setAiThinking] = useState(false)

    // Form State
    const [newNote, setNewNote] = useState({ type: 'consultation', symptoms: '', diagnosis: '', doctorNotes: '' })
    const [savingNote, setSavingNote] = useState(false)

    useEffect(() => {
        // Fetch patient details (In a real app, you'd need an endpoint like GET /api/clinical/patients/[id])
        // For the demo, we'll fetch all and filter
        fetch(`/api/clinical/patients?brandProfileId=dr-shimaa-obgyn-profile-uuid-v100`)
            .then(res => res.json())
            .then(data => {
                const p = data.patients.find((p: any) => p.id === patientId)
                setPatient(p)
                setLoading(false)
            })
            .catch(console.error)
    }, [patientId])

    const askSecondBrain = async () => {
        if (!chatQuery.trim() || aiThinking) return
        
        const q = chatQuery
        setChatQuery('')
        setChatHistory(prev => [...prev, { role: 'dr', text: q }])
        setAiThinking(true)

        try {
            const res = await fetch('/api/ai/clinical-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientId, query: q })
            })
            const data = await res.json()
            
            if (data.response) {
                setChatHistory(prev => [...prev, { role: 'ai', text: data.response }])
            }
        } catch (error) {
            setChatHistory(prev => [...prev, { role: 'ai', text: "عذراً، حدث خطأ في الاتصال بالشبكة العصبية." }])
        } finally {
            setAiThinking(false)
        }
    }

    const saveEncounter = async () => {
        setSavingNote(true)
        try {
            await fetch('/api/clinical/encounters', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientId,
                    ...newNote
                })
            })
            // Reload page or state to show new encounter
            window.location.reload()
        } catch (error) {
            console.error(error)
        } finally {
            setSavingNote(false)
        }
    }

    if (loading) return <div className="flex justify-center p-40"><Activity size={40} className="animate-bounce text-sky-600" /></div>
    if (!patient) return <div className="text-center p-20 text-red-500 font-bold">لم يتم العثور على المريضة</div>

    return (
        <div className="flex h-screen bg-gray-50 font-sans" dir="rtl">
            
            {/* Main EMR Section */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/dr-shimaa/patients" className="p-2 hover:bg-gray-100 rounded-full transition">
                            <ArrowRight className="text-gray-500" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-sky-950 flex items-center gap-2">
                                {patient.name}
                                <span className="bg-sky-100 text-sky-600 text-xs px-2 py-1 rounded-md font-bold">ملف نشط</span>
                            </h1>
                            <p className="text-sm text-gray-500">{patient.phone} • فصيلة الدم: {patient.bloodType || 'غير معروف'}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left Column: Quick Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <AlertCircle size={18} className="text-amber-500" />
                                تحذيرات طبية
                            </h3>
                            <p className="text-sm text-gray-600">{patient.allergies || 'لا توجد حساسية مسجلة'}</p>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User size={18} className="text-sky-500" />
                                التاريخ الطبي
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{patient.medicalHistory || 'غير مسجل'}</p>
                        </div>
                    </div>

                    {/* Right Column: Encounters & New Note */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Add New Encounter */}
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-sky-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-500"></div>
                            <h3 className="font-black text-lg text-sky-950 mb-4 flex items-center gap-2">
                                <FileText size={20} className="text-sky-500" />
                                تدوين زيارة جديدة
                            </h3>
                            <div className="space-y-4">
                                <select 
                                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-sky-400 text-sm"
                                    value={newNote.type}
                                    onChange={(e) => setNewNote({...newNote, type: e.target.value})}
                                >
                                    <option value="consultation">كشف عادي</option>
                                    <option value="followup">استشارة / متابعة</option>
                                    <option value="pregnancy">متابعة حمل</option>
                                    <option value="ultrasound">سونار</option>
                                </select>
                                <textarea 
                                    placeholder="الأعراض والشكوى..."
                                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-sky-400 text-sm h-20 resize-none"
                                    value={newNote.symptoms}
                                    onChange={(e) => setNewNote({...newNote, symptoms: e.target.value})}
                                />
                                <textarea 
                                    placeholder="التشخيص والملاحظات الطبية..."
                                    className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-sky-400 text-sm h-32 resize-none"
                                    value={newNote.doctorNotes}
                                    onChange={(e) => setNewNote({...newNote, doctorNotes: e.target.value})}
                                />
                                <button 
                                    onClick={saveEncounter}
                                    disabled={savingNote}
                                    className="w-full bg-sky-950 text-white font-bold py-3 rounded-xl hover:bg-sky-900 transition flex justify-center items-center gap-2"
                                >
                                    {savingNote ? 'جاري الحفظ والتحليل بالذكاء الاصطناعي...' : 'حفظ الزيارة'}
                                    {!savingNote && <Sparkles size={16} className="text-sky-300" />}
                                </button>
                            </div>
                        </div>

                        {/* History */}
                        <div className="space-y-4">
                            <h3 className="font-black text-lg text-gray-800">تاريخ الزيارات</h3>
                            {patient.encounters?.length > 0 ? patient.encounters.map((enc: any) => (
                                <div key={enc.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-lg text-xs">{enc.type}</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12}/> {new Date(enc.date).toLocaleDateString('ar-EG')}</span>
                                    </div>
                                    {enc.symptoms && <p className="text-sm text-gray-800"><strong>الأعراض:</strong> {enc.symptoms}</p>}
                                    {enc.doctorNotes && <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed">{enc.doctorNotes}</p>}
                                </div>
                            )) : (
                                <p className="text-gray-400 text-center py-10">لا توجد زيارات سابقة</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Second Brain Sidebar */}
            <div className="w-[400px] bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl relative z-20">
                <div className="p-6 border-b border-slate-800 bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute -inset-10 bg-indigo-500/10 blur-[50px] rounded-full"></div>
                    <BrainCircuit size={32} className="text-indigo-400 mb-2 relative z-10" />
                    <h2 className="text-lg font-black text-white tracking-widest relative z-10">العقل المدبر AI</h2>
                    <p className="text-xs text-indigo-300 relative z-10">RAG Clinical Assistant</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatHistory.map((msg, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'dr' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-lg ${
                                msg.role === 'dr' 
                                ? 'bg-sky-600 text-white rounded-tl-none' 
                                : 'bg-slate-800 text-slate-200 rounded-tr-none border border-slate-700'
                            }`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                    {aiThinking && (
                        <div className="flex justify-start">
                            <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tr-none flex items-center gap-2">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-slate-950 border-t border-slate-800">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="flex-1 bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition placeholder:text-slate-500"
                            placeholder="اسأل الذكاء الاصطناعي عن تاريخ المريضة..."
                            value={chatQuery}
                            onChange={e => setChatQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && askSecondBrain()}
                        />
                        <button 
                            onClick={askSecondBrain}
                            disabled={!chatQuery.trim() || aiThinking}
                            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-500 transition disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
