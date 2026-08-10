'use client';
import React from 'react';

export default function QuotationTemplatePage() {
    
    // Extracted Header Component to keep code DRY
    const DocumentHeader = () => (
        <div className="flex justify-between items-center pb-4 border-b-[3px] border-[#0f172a] mb-6 relative">
            <div className="absolute -bottom-[3px] left-0 w-1/3 border-b-[3px] border-[#d4af37]"></div>
            <div className="text-left w-[35%]">
                <h1 className="font-en text-[20px] font-extrabold tracking-tight text-[#0f172a] leading-tight">
                    LEVER PIONEER
                    <span className="block text-[#1e293b]">ELEVATORS</span>
                </h1>
                <p className="font-en text-[#d4af37] text-[9px] font-bold tracking-[0.2em] uppercase mt-2">
                    Installation • Maintenance • Supply
                </p>
            </div>
            <div className="w-[30%] flex justify-center items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lever-pioneer-share.png" alt="Lever Logo" className="w-[160px] object-contain drop-shadow-sm" style={{ mixBlendMode: 'darken', filter: 'brightness(1.08) contrast(1.2)' }} />
            </div>
            <div className="text-right w-[35%]">
                <h1 className="font-ar text-[24px] font-black tracking-tight text-[#0f172a] leading-tight">
                    ليفر الرائدة
                    <span className="block text-[#1e293b]">للمصاعد</span>
                </h1>
                <p className="font-ar text-[#d4af37] text-[12px] font-extrabold mt-1">
                    تركيب • صيانة • توريد
                </p>
            </div>
        </div>
    );

    // Extracted Footer Component to keep code DRY
    const DocumentFooter = () => (
        <div className="mt-auto pt-3 border-t-[3px] border-[#0f172a] relative">
            <div className="absolute -top-[3px] right-0 w-1/3 border-t-[3px] border-[#d4af37]"></div>
            
            <div className="w-full flex flex-col items-center justify-center gap-1.5 pt-1.5 pb-2">
                {/* Line 1: Commercial Registration & Tax ID */}
                <div className="flex items-center gap-4 font-ar text-[#475569] text-[11px] font-bold tracking-wide" dir="rtl">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[#0f172a]">سجل تجاري رقم:</span>
                        <span>23012</span>
                    </div>
                    <div className="w-[3px] h-[3px] rounded-full bg-[#d4af37]"></div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[#0f172a]">الرقم القومي للمنشأة:</span>
                        <span>276800419</span>
                    </div>
                </div>
                
                {/* Line 2: Address & Phone Numbers */}
                <div className="flex items-center gap-4 font-ar text-[#475569] text-[10.5px] font-bold" dir="rtl">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span>الدقهليه - المنصوره - مركز ومدينة السنبلاوين</span>
                    </div>
                    <div className="w-[3px] h-[3px] rounded-full bg-[#d4af37]"></div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <span dir="ltr" className="tracking-wider text-[#0f172a]">01070615372 - 01068560962 - 01065661882</span>
                    </div>
                </div>
            </div>
        </div>
    );

    // Helper for table rows
    const TableRow = ({ labelEn, labelAr, valueEn, valueAr, isDark = false, isLast = false }: { labelEn: string, labelAr: string, valueEn: string, valueAr: string, isDark?: boolean, isLast?: boolean }) => (
        <tr className={`border-[#e2e8f0] group hover:bg-[#f8fafc] transition-colors ${isDark ? 'bg-[#fafafa]' : 'bg-white'} ${!isLast ? 'border-b' : ''}`}>
            <td className="w-[35%] border-r border-[#e2e8f0] px-5 py-1.5">
                <div className="font-en font-bold text-[#334155]">{labelEn}</div>
                <div className="font-ar text-[#64748b] text-[11px] mt-0.5">{labelAr}</div>
            </td>
            <td className="w-[65%] px-5 py-1.5 flex justify-between items-center h-full">
                <div className="w-full flex justify-between items-center">
                    <div className="font-en font-bold text-[#0f172a] whitespace-pre-line">{valueEn}</div>
                    <div className="font-ar text-[#475569] font-semibold text-right whitespace-pre-line" dangerouslySetInnerHTML={{__html: valueAr}}></div>
                </div>
            </td>
        </tr>
    );

    const SectionHeader = ({ en, ar }: { en: string, ar: string }) => (
        <tr className="bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] border-y border-[#cbd5e1] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] relative">
            <td colSpan={2} className="px-5 py-2 border-b border-[#94a3b8]">
                <div className="flex justify-between items-center w-full relative z-10">
                    <span className="font-en font-extrabold text-[#0f172a] text-[14px] tracking-widest drop-shadow-sm">{en}</span>
                    <span className="font-ar font-bold text-[#0f172a] text-[15px] drop-shadow-sm">{ar}</span>
                </div>
            </td>
        </tr>
    );

    const PageContainer = ({ children }: { children: React.ReactNode }) => (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative text-[#0f172a] flex flex-col mx-auto mb-8 print:mb-0">
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lever-pioneer-share.png" alt="Watermark" className="w-[140mm] grayscale" style={{ mixBlendMode: 'darken', filter: 'brightness(1.15) contrast(1.3)' }} />
            </div>
            <div className="z-10 relative flex flex-col h-full p-[10mm] pt-[12mm] print:p-0">
                {children}
            </div>
        </div>
    );

    const TitleBar = ({ en, ar }: { en: string, ar: string }) => (
        <div className="relative overflow-hidden bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] text-white flex justify-between items-center px-6 py-2.5 rounded-t-xl border-b-[4px] border-[#d4af37] shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),0_6px_10px_rgba(0,0,0,0.15)] mb-0 border border-t-[#334155] border-x-[#1e293b]">
            <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-xl"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fef08a]/30 to-transparent pointer-events-none"></div>
            <span className="font-en text-[17px] font-extrabold tracking-[0.15em] uppercase relative z-10 drop-shadow-md">{en}</span>
            <span className="font-ar text-[20px] font-black relative z-10 drop-shadow-md">{ar}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#e2e8f0] flex flex-col py-10 print:block print:!p-0 print:!m-0 print:!bg-white selection:bg-blue-900 selection:text-white" dir="ltr">
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Cairo:wght@500;700;900&display=swap');
                @media print {
                    @page { size: A4 portrait; margin: 0 !important; }
                    html, body { 
                        background-color: white !important; 
                        background: white !important;
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .no-print { display: none !important; }
                    /* Container mapping directly to 1 physical page */
                    .a4-page {
                        width: 100% !important;
                        height: 100% !important;
                        max-height: 297mm !important;
                        overflow: hidden !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                        padding: 8mm !important;
                        page-break-after: always !important;
                    }
                    /* Remove extra blank page at the end */
                    .a4-page:last-child {
                        page-break-after: auto !important;
                    }
                }
                .font-en { font-family: 'Inter', sans-serif; }
                .font-ar { font-family: 'Cairo', sans-serif; }
            `}} />
            
            {/* ---------------- PAGE 1: Quote Part 1 ---------------- */}
            <PageContainer>
                <DocumentHeader />
                <div className="flex-grow">
                    <TitleBar en="Passengers Elevator" ar="مصعد ركاب" />
                    <div className="w-full border-x border-b border-[#cbd5e1] rounded-b-xl overflow-hidden shadow-sm bg-white">
                        <table className="w-full text-[12px] border-collapse">
                            <tbody>
                                <SectionHeader en="CONTROL PANEL" ar="كونترول التحكم" />
                                <TableRow labelEn="Brand" labelAr="الماركة" valueEn="Ultimatrue" valueAr="كارت التحكم ماركة التيماترو" isDark={false} />
                                <TableRow labelEn="Relays - Contactors" labelAr="ريليه - كونتاكتور" valueEn="Schneider" valueAr="ماركة شنايدر العالمية" isDark={true} />
                                <TableRow labelEn="Inverter" labelAr="جهاز انفرتر" valueEn="Schneider" valueAr="ماركة شنايدر العالمية" isDark={false} />
                                <TableRow labelEn="Travelling Cable" labelAr="الكابل المرن" valueEn="Elite Pro" valueAr="كابل المرن صناعة تركي مستورد" isDark={true} isLast={true} />

                                <SectionHeader en="MACHINE" ar="الماكينة" />
                                <TableRow labelEn="Brand" labelAr="الماركة" valueEn="Sicor" valueAr="ماكينة ايطالي ماركة سيكور" isDark={false} />
                                <TableRow labelEn="Load capacity" labelAr="الحمولة" valueEn="500 KG" valueAr="٥٠٠ كجم" isDark={true} />
                                <TableRow labelEn="Horsepower" labelAr="قوة الحصان" valueEn="9.4 HP" valueAr="٩.٤ حصان" isDark={false} />
                                <TableRow labelEn="Number of Ropes" labelAr="عدد الوايرات" valueEn="4 Ropes" valueAr="٤ وايرات" isDark={true} isLast={true} />

                                <SectionHeader en="LANDING DOOR" ar="الأبواب الخارجية" />
                                <TableRow labelEn="Brand" labelAr="الماركة" valueEn="HAS" valueAr="باب نص اتوماتيك" isDark={false} />
                                <TableRow labelEn="Door Type" labelAr="نوع الباب" valueEn="Swing Door" valueAr="باب مفصلي اتجاه فتح الضلفة<br/>جهة اليمين او الشمال" isDark={true} />
                                <TableRow labelEn="Door Glass" labelAr="زجاج الابواب" valueEn="Glass 5mm" valueAr="يتم تركيب زجاج ٥ ملي مرايا<br/>مصنفر او عسلي او فاميه اسود" isDark={false} />
                                <TableRow labelEn="Clear Door Width" labelAr="صافي عرض المدخل" valueEn="800 mm" valueAr="٨٠٠ مم" isDark={true} isLast={true} />
                            </tbody>
                        </table>
                    </div>
                </div>
                <DocumentFooter />
            </PageContainer>

            {/* ---------------- PAGE 2: Quote Part 2 ---------------- */}
            <PageContainer>
                <DocumentHeader />
                <div className="flex-grow">
                    <TitleBar en="Passengers Elevator (Cont.)" ar="مصعد ركاب (تكملة)" />
                    <div className="w-full border-x border-b border-[#cbd5e1] rounded-b-xl overflow-hidden shadow-sm bg-white">
                        <table className="w-full text-[12px] border-collapse">
                            <tbody>
                                <TableRow labelEn="Oil Machine" labelAr="زيت الماكينة" valueEn="Mobil" valueAr="زيت تروس للماكينات" isDark={false} />
                                <TableRow labelEn="Weight" labelAr="زهر ثقل الموازنة" valueEn="" valueAr="زهر صناعة محلي + غلاف بلاستيك" isDark={true} />
                                <TableRow labelEn="Nc - No" labelAr="مغناطيس وقوف - وسليكتور" valueEn="Stem or Fitre" valueAr="المغناطيسات ايطالي مستورد" isDark={false} />
                                <TableRow labelEn="Door Lock" labelAr="ماركة تركي مستوردة" valueEn="Gan lift" valueAr="تركي مستورد" isDark={true} />
                                <TableRow labelEn="Retiring cam" labelAr="جهاز الكامة لفتح الباب" valueEn="TTi" valueAr="تركي مستورد" isDark={false} />
                                <TableRow labelEn="Swinger Door Closer" labelAr="طلمبة قفل الباب الخارجي" valueEn="TTi" valueAr="تركي مستورد" isDark={true} />
                                <TableRow labelEn="ARD" labelAr="جهاز انقاذ طوارئ" valueEn="Electro Smart" valueAr="كونترول طوارئ + بطاريات طوارئ صناعة ماليزي" isDark={false} />
                                <TableRow labelEn="Intercom" labelAr="انتركوم" valueEn="COMMAX" valueAr="انتركوم داخل الكابينة وبجوار باب الدور الارضي" isDark={true} />
                                <TableRow labelEn="Safety Door" labelAr="باب فولدينج للكابينة" valueEn="Has or Door life" valueAr="باب امان داخل الكابينة فولدينج لسلامة الركاب" isDark={false} isLast={true} />
                            </tbody>
                        </table>
                    </div>
                </div>
                <DocumentFooter />
            </PageContainer>

            {/* ---------------- PAGE 3: Free Maintenance & Warranty ---------------- */}
            <PageContainer>
                <DocumentHeader />
                <div className="flex-grow">
                    <TitleBar en="Maintenance & Warranty" ar="الصيانة المجانية والضمان" />
                    <div className="w-full border-x border-b border-[#cbd5e1] rounded-b-xl overflow-hidden shadow-sm bg-white">
                        <table className="w-full text-[13px] border-collapse">
                            <tbody>
                                <tr className="border-b border-[#e2e8f0] bg-white group hover:bg-[#f8fafc] transition-colors">
                                    <td className="w-[30%] border-r border-[#e2e8f0] px-6 py-6 text-center">
                                        <div className="font-ar font-black text-[#0f172a] text-[16px] drop-shadow-sm">الصيانة المجانية</div>
                                        <div className="font-en text-[#64748b] text-[12px] font-bold mt-1 tracking-widest uppercase">Free Maintenance</div>
                                    </td>
                                    <td className="w-[70%] px-6 py-6 font-ar text-[#334155] leading-loose text-right">
                                        <ul className="list-disc list-inside space-y-4 font-semibold text-[12px]" dir="rtl">
                                            <li>تلتزم ليفر للمصاعد والسلالم الكهربائية بإجراء الصيانة المجانية للمصعد لمدة ١٢ شهر كاملة وتبدأ من تاريخ التشغيل وإستلام المصعد ، وتشمل الصيانة الوقائية والدورية والفحص الشامل لجميع قطع المصعد بزيارة لمرة واحدة شهرياً.</li>
                                            <li>تلتزم الشركة بالاستجابة لطلب العميل بالتوجه لاصلاح المصعد في حالات الأعطال خلال ٢٤ ساعه من تلقي الطلب كحد أقصى باذلا الطرف الأول قصارى جهده بأن يلبي هذا الطلب بالسرعة المتاحة الممكنة في اي حالة طوارئء قصوى يتعرض لها العميل قد تسبب خطر على حياة انسان فإن الطرف الأول ملزم بالرد على البلاغ في اي وقت ليلا او نهارا او عطل رسميه و أعياد وعلى الطرف الأول تزويد الطرف الثاني او من ينوب عنه بوثائق الصيانة الرسميه شهريا و التي تثبت حضوره للقيام بأعمال الصيانة او اصلاح الخلل في حالات الأعطال.</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr className="bg-[#fafafa] group hover:bg-[#f8fafc] transition-colors">
                                    <td className="w-[30%] border-r border-[#e2e8f0] px-6 py-6 text-center">
                                        <div className="font-ar font-black text-[#0f172a] text-[16px] drop-shadow-sm">الضمان</div>
                                        <div className="font-en text-[#64748b] text-[12px] font-bold mt-1 tracking-widest uppercase">Warranty</div>
                                    </td>
                                    <td className="w-[70%] px-6 py-6 font-ar text-[#334155] leading-loose text-right">
                                        <ul className="list-disc list-inside space-y-4 font-semibold text-[12px]" dir="rtl">
                                            <li>تلتزم ليفر للمصاعد والسلالم الكهربائية بالضمان الكامل على جميع قطع المصعد لمدة ٣٦ شهر من تاريخ تسليم المصعد للطرف الثاني ، ويشمل الضمان الأعطال الناتجة عن خلل في التصنيع أو التركيب بشرط إستخدام المصعد / المصاعد أو القطع - المكونات للغايات التي أعدت لها أصلا وبصورة صحيحة وبطريقة معقولة ، ولا تتحمل الشركة أي إلتزام بضمان أي قطع في حالة إستخدامها بصورة لغير الغايات التي أعدت لها أصلاً أو إذا كان الضرر / العطل / التخريب حدث بصورة متعمدة أو ناتجة عن سوء الإستخدام أو نتيجة قهرية.</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <DocumentFooter />
            </PageContainer>

            {/* ---------------- PAGE 4: Technical Contract ---------------- */}
            <PageContainer>
                <DocumentHeader />
                <div className="flex-grow">
                    <TitleBar en="Technical Contract" ar="العقد الفني" />
                    <div className="w-full border-x border-b border-[#cbd5e1] rounded-b-xl overflow-hidden shadow-sm bg-white pb-6 relative">
                        
                        <div className="bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] text-center py-2 border-b border-[#cbd5e1] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                            <span className="font-ar font-bold text-[#475569] text-[14px]">تمت الاتفاقية بين الطرفين</span>
                        </div>

                        <table className="w-full text-[13px] border-collapse">
                            <tbody>
                                <SectionHeader en="FIRST PARTY" ar="الطرف الأول" />
                                <TableRow labelEn="Date" labelAr="التاريخ" valueEn="" valueAr="" isDark={false} />
                                <TableRow labelEn="Company Name" labelAr="اسم الشركة" valueEn="" valueAr="ليفر الرائدة للمصاعد والسلالم الكهربائية" isDark={true} />
                                <TableRow labelEn="Address" labelAr="العنوان" valueEn="" valueAr="المنصورة - السنبلاوين" isDark={false} />
                                <TableRow labelEn="Contacts" labelAr="ارقام التواصل" valueEn="" valueAr="01070615372 - 01068560962" isDark={true} isLast={true} />

                                <SectionHeader en="SECOND PARTY" ar="الطرف الثاني" />
                                <TableRow labelEn="Client Name" labelAr="اسم العميل" valueEn="" valueAr="" isDark={false} />
                                <TableRow labelEn="Project Address" labelAr="عنوان المشروع" valueEn="" valueAr="" isDark={true} />
                                <TableRow labelEn="Units" labelAr="العدد" valueEn="" valueAr="" isDark={false} />
                                <TableRow labelEn="Elevator Type" labelAr="نوع المصعد" valueEn="" valueAr="" isDark={true} isLast={true} />
                            </tbody>
                        </table>

                        {/* Signatures Section */}
                        <div className="w-[90%] mx-auto mt-8 mb-2 border-[2px] border-[#cbd5e1] rounded-lg bg-white flex overflow-hidden shadow-sm">
                            <div className="w-1/2 border-r-[2px] border-[#cbd5e1] flex flex-col h-[130px]">
                                <div className="flex justify-between items-center bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] px-4 py-2 border-b-[2px] border-[#cbd5e1]">
                                    <span className="font-en font-extrabold text-[12px] text-[#475569] tracking-wider">SECOND PARTY</span>
                                    <span className="font-ar font-bold text-[14px] text-[#0f172a]">الطرف الثاني</span>
                                </div>
                                <div className="text-center font-ar font-black text-[#0f172a] mt-4 text-[15px]"></div>
                                <div className="mt-auto font-en text-[#94a3b8] text-[11px] font-bold uppercase tracking-widest px-4 py-2 opacity-50">Signature:</div>
                            </div>
                            <div className="w-1/2 flex flex-col h-[130px]">
                                <div className="flex justify-between items-center bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] px-4 py-2 border-b-[2px] border-[#cbd5e1]">
                                    <span className="font-en font-extrabold text-[12px] text-[#475569] tracking-wider">FIRST PARTY</span>
                                    <span className="font-ar font-bold text-[14px] text-[#0f172a]">الطرف الأول</span>
                                </div>
                                <div className="text-center font-ar font-black text-[#0f172a] mt-4 text-[14px]">ليفر الرائدة للمصاعد والسلالم الكهربائية</div>
                                <div className="mt-auto flex justify-between w-full px-4 py-2">
                                    <span className="font-en text-[#94a3b8] text-[11px] font-bold uppercase tracking-widest opacity-50">Signature:</span>
                                    <span className="font-en text-[#94a3b8] text-[11px] font-bold uppercase tracking-widest opacity-50">Stamp:</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <DocumentFooter />
            </PageContainer>

        </div>
    );
}
