'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, UserPlus, Calendar, Phone, Activity } from 'lucide-react'
import Link from 'next/link'

// We will use the brandProfileId for Dr. Shimaa's clinic
const SHIMAA_BRAND_ID = "dr-shimaa-obgyn-profile-uuid-v100"

export default function PatientsRosterPage() {
    const [patients, setPatients] = useState<any[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/clinical/patients?brandProfileId=${SHIMAA_BRAND_ID}`)
            .then(res => res.json())
            .then(data => {
                if (data.patients) setPatients(data.patients)
                setLoading(false)
            })
            .catch(console.error)
    }, [])

    const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search))

    return (
        <div className="p-8 max-w-7xl mx-auto font-sans" dir="rtl">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-sky-950 mb-2">سجل المرضى</h1>
                    <p className="text-gray-500">نظام السجلات الطبية الإلكترونية (EMR)</p>
                </div>
                <button className="flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition shadow-lg font-bold">
                    <UserPlus size={20} />
                    <span>إضافة مريضة جديدة</span>
                </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 flex gap-4 items-center">
                <Search className="text-gray-400" />
                <input 
                    type="text" 
                    placeholder="ابحث بالاسم أو رقم الهاتف..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-lg outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
                />
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPatients.map(patient => (
                        <Link href={`/dashboard/dr-shimaa/patients/${patient.id}`} key={patient.id}>
                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-sky-200 transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center text-xl font-black group-hover:bg-sky-600 group-hover:text-white transition">
                                        {patient.name.charAt(0)}
                                    </div>
                                    {patient.encounters?.length > 0 && (
                                        <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(patient.encounters[0].date).toLocaleDateString('ar-EG')}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{patient.name}</h3>
                                <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
                                    <Phone size={14} />
                                    <span>{patient.phone}</span>
                                </div>
                                
                                <div className="border-t border-gray-50 pt-4 flex gap-4 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs">فصيلة الدم</span>
                                        <span className="font-semibold text-gray-700">{patient.bloodType || 'غير مسجل'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs">آخر زيارة</span>
                                        <span className="font-semibold text-gray-700 truncate max-w-[120px]">
                                            {patient.encounters?.[0]?.type || 'زيارة أولى'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                    {filteredPatients.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-400">
                            <Activity size={48} className="mx-auto mb-4 opacity-20" />
                            <p>لا يوجد مرضى مطابقين للبحث</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
