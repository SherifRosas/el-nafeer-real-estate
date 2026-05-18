"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  FileText, 
  Download, 
  Cpu, 
  Globe, 
  ShieldCheck,
  BarChart3,
  Activity
} from 'lucide-react';
import { jsPDF } from 'jspdf';

const STOCK_DATA = [
  { symbol: 'COMI', name: 'Commercial International Bank', price: 82.50, change: +1.2, recommendation: 'BUY', confidence: 88, sentiment: 'Positive', news: 'Bank reports 20% growth in quarterly net profit.' },
  { symbol: 'HRHO', name: 'EFG Hermes Holding', price: 18.20, change: -0.5, recommendation: 'HOLD', confidence: 65, sentiment: 'Neutral', news: 'Investment banking division expands into East African markets.' },
  { symbol: 'FWRY', name: 'Fawry for Banking Tech', price: 5.40, change: +3.8, recommendation: 'STRONG BUY', confidence: 94, sentiment: 'Very Positive', news: 'Major partnership with state-owned banks for digital payments.' },
  { symbol: 'ESRS', name: 'Ezz Steel', price: 65.10, change: +0.8, recommendation: 'BUY', confidence: 72, sentiment: 'Positive', news: 'Increase in local steel prices boosts domestic margins.' },
  { symbol: 'TMGH', name: 'Talaat Moustafa Group', price: 34.15, change: -2.1, recommendation: 'SELL', confidence: 45, sentiment: 'Negative', news: 'Delays in new luxury development project in New Cairo.' },
];

const SimulatedChart = ({ change }: { change: number }) => {
  // Generate random path for a simulated stock chart
  const points = Array.from({ length: 20 }, (_, i) => ({
    x: i * 20,
    y: 50 + Math.sin(i * 0.5) * 20 + (Math.random() - 0.5) * 15
  }));
  
  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <div className="w-full h-32 mt-4 relative">
      <svg viewBox="0 0 400 100" className="w-full h-full">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={change > 0 ? '#4ade80' : '#f87171'} stopOpacity="0.3" />
            <stop offset="100%" stopColor={change > 0 ? '#4ade80' : '#f87171'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={path}
          fill="none"
          stroke={change > 0 ? '#4ade80' : '#f87171'}
          strokeWidth="3"
        />
        <path
          d={`${path} L 380,100 L 0,100 Z`}
          fill="url(#chartGradient)"
        />
      </svg>
    </div>
  );
};

export default function EGXDemoPage() {
  const [activeStock, setActiveStock] = useState(STOCK_DATA[0]);
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = {
    EN: {
      title: 'Sovereign Intelligence',
      subtitle: 'Global-Standard Analytics for the Egyptian Exchange',
      watchlist: 'Watchlist',
      rec: 'Recommendation',
      confidence: 'AI Confidence Score',
      sentiment: 'Social Sentiment',
      volatility: 'Volatility',
      download: 'Download Sovereign Report',
      generating: 'GENERATING...',
      trend: 'Performance Trend',
      intel: 'Latest Intelligence',
      status: 'EGID-FEED-STABLE',
      connection: 'Market Connection',
      protocol: 'AI Protocol',
      contact: 'Consult with Expert',
      low: 'LOW',
    },
    AR: {
      title: 'الاستخبارات السيادية',
      subtitle: 'تحليلات بمعايير عالمية للبورصة المصرية',
      watchlist: 'قائمة المتابعة',
      rec: 'التوصية',
      confidence: 'مؤشر الثقة بالذكاء الاصطناعي',
      sentiment: 'تحليل المشاعر العامة',
      volatility: 'معدل التذبذب',
      download: 'تحميل التقرير السيادي',
      generating: 'جاري التحميل...',
      trend: 'اتجاه الأداء',
      intel: 'أحدث المعلومات',
      status: 'اتصال مستقر',
      connection: 'حالة السوق',
      protocol: 'بروتوكول الذكاء الاصطناعي',
      contact: 'تحدث مع خبير',
      low: 'منخفض',
    }
  };

  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(197, 160, 89);
    doc.text('SOVEREIGN EGX INTELLIGENCE', 20, 30);
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Analysis Report for: ${activeStock.name} (${activeStock.symbol})`, 20, 50);
    doc.text(`Current Price: EGP ${activeStock.price.toFixed(2)}`, 20, 60);
    doc.text(`Recommendation: ${activeStock.recommendation}`, 20, 70);
    doc.text(`AI Confidence Score: ${activeStock.confidence}%`, 20, 80);
    doc.save(`${activeStock.symbol}_Sovereign_Report.pdf`);
    setTimeout(() => setIsGenerating(false), 1000);
  };

  if (!isClient) return null;

  return (
    <div className={`min-h-screen bg-[#020408] text-white p-4 md:p-8 font-['Cairo'] ${lang === 'AR' ? 'rtl' : 'ltr'}`} dir={lang === 'AR' ? 'rtl' : 'ltr'}>
      <div className="fixed inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#c5a059 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>

      <div className="fixed top-8 right-8 md:right-12 z-50 flex gap-4">
        <button 
          onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
          className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-widest text-[#c5a059]"
        >
          {lang === 'EN' ? 'العربية' : 'English'}
        </button>
      </div>

      <a 
        href="https://wa.me/201004690565"
        target="_blank"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] p-4 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center gap-3 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-white font-bold whitespace-nowrap px-0 group-hover:px-2">
          {t[lang].contact}
        </span>
        <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.096 3.389l-.715 2.614 2.673-.701c.883.528 1.916.83 3.018.83 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.016c-.147.413-.75.753-1.034.78-.284.027-.633.045-1.034-.082-.257-.082-.578-.192-.982-.367-1.725-.743-2.844-2.495-2.93-2.614-.082-.119-.715-.954-.715-1.816 0-.862.45-1.284.614-1.44.165-.156.358-.192.477-.192h.339c.11 0 .257-.009.376.266.128.303.44 1.073.477 1.156.037.082.064.183.01.294-.055.11-.082.183-.165.284-.082.092-.174.202-.248.275-.082.082-.174.174-.073.348.092.174.413.679.881 1.091.605.532 1.11.697 1.267.78.156.082.248.064.339-.046.092-.11.394-.459.505-.614.11-.156.22-.128.376-.073.156.055 1 .477 1.174.56.174.082.294.128.339.202.046.082.046.477-.11.89zM12 2C6.477 2 2 6.477 2 12c0 2.136.67 4.113 1.814 5.74L2.3 22l4.35-.916c1.61 1.103 3.559 1.746 5.65 1.746 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
        </svg>
      </a>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="text-[#c5a059] w-8 h-8" />
            <h1 className="text-3xl md:text-5xl font-bold text-luxury-gold uppercase tracking-tighter">
              {t[lang].title}
            </h1>
          </div>
          <p className="text-gray-400 flex items-center gap-2">
            <Globe className="w-4 h-4" /> {t[lang].subtitle}
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hidden md:block">
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-1">{t[lang].connection}</div>
            <div className="text-green-400 font-mono text-sm flex items-center gap-2">
              <Activity className="w-3 h-3 animate-pulse" /> {t[lang].status}
            </div>
          </div>
          <div className="bg-[#c5a059]/10 border border-[#c5a059]/30 px-6 py-3 rounded-2xl">
            <div className="text-[10px] text-[#c5a059] uppercase tracking-[0.3em] mb-1">{t[lang].protocol}</div>
            <div className="text-white font-mono text-sm">V4.2.0-ULTRA</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-4 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold border-l-4 border-[#c5a059] pl-4 uppercase">{t[lang].watchlist}</h2>
            <div className="p-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-hide space-y-3">
            {STOCK_DATA.map((stock) => (
              <motion.div
                key={stock.symbol}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStock(stock)}
                className={`p-4 rounded-xl cursor-pointer border transition-all ${
                  activeStock.symbol === stock.symbol 
                    ? 'bg-gradient-to-br from-[#c5a059]/20 to-transparent border-[#c5a059]' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-lg flex items-center gap-2">
                      {stock.symbol}
                      {stock.change > 0 ? <TrendingUp className="w-3 h-3 text-green-400" /> : <TrendingDown className="w-3 h-3 text-red-400" />}
                    </div>
                    <div className="text-xs text-gray-400 truncate w-40">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-lg">{stock.price.toFixed(2)}</div>
                    <div className={`text-xs font-bold ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change > 0 ? '+' : ''}{stock.change}%
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="milky-glass rounded-3xl p-6 md:p-10 border border-white/10 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStock.symbol}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-[#c5a059] text-[#020408] px-2 py-1 rounded text-[10px] font-black uppercase">Official Stock</span>
                      <h3 className="text-4xl md:text-5xl font-black text-white">{activeStock.symbol}</h3>
                    </div>
                    <h4 className="text-xl text-[#c5a059] font-semibold">{activeStock.name}</h4>
                  </div>
                  
                  <div className={`px-8 py-4 rounded-2xl font-black text-2xl tracking-tighter shadow-2xl flex flex-col items-center justify-center min-w-[180px] ${
                    activeStock.recommendation.includes('BUY') ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    activeStock.recommendation === 'SELL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-1">{t[lang].rec}</span>
                    {activeStock.recommendation}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-gray-400 text-sm uppercase flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" /> {t[lang].trend}
                        </div>
                        <div className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-400">7-DAY SCAN</div>
                      </div>
                      <SimulatedChart change={activeStock.change} />
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <div className="text-gray-400 text-sm uppercase mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> {t[lang].intel}
                      </div>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {activeStock.news}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#c5a059]/10 to-transparent p-6 rounded-2xl border border-[#c5a059]/20 relative overflow-hidden">
                       <div className="absolute -top-4 -right-4 opacity-10">
                          <ShieldCheck className="w-24 h-24 text-[#c5a059]" />
                       </div>
                       <div className="text-gray-400 text-sm uppercase mb-4">{t[lang].confidence}</div>
                       <div className="text-6xl font-black text-luxury-gold mb-4">{activeStock.confidence}%</div>
                       <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${activeStock.confidence}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-[#c5a059] to-[#f9d423]"
                          ></motion.div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="text-[10px] text-gray-500 uppercase mb-1">{t[lang].sentiment}</div>
                          <div className={`text-lg font-bold ${activeStock.sentiment.includes('Positive') ? 'text-green-400' : 'text-gray-300'}`}>
                            {activeStock.sentiment}
                          </div>
                       </div>
                       <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="text-[10px] text-gray-500 uppercase mb-1">{t[lang].volatility}</div>
                          <div className="text-lg font-bold text-gray-300">{t[lang].low}</div>
                       </div>
                    </div>

                    <button 
                      onClick={generatePDF}
                      disabled={isGenerating}
                      className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-3 transition-colors group"
                    >
                      {isGenerating ? (
                        <div className="flex items-center gap-2">
                           <div className="w-4 h-4 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
                           <span>{t[lang].generating}</span>
                        </div>
                      ) : (
                        <>
                          <Download className="w-5 h-5 text-[#c5a059] group-hover:translate-y-1 transition-transform" />
                          <span className="font-bold uppercase tracking-widest text-sm">{t[lang].download}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Technical Indicators Strip */}
                <div className="mt-10 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-3">
                    {['RSI: 42.5', 'SMA-50: CROSS', 'MACD: BULL', 'VOLUME: HIGH', 'P/E: 12.4'].map((indicator) => (
                      <span key={indicator} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-[#c5a059]">
                        {indicator}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Feedback Section */}
                <div className="mt-16 p-8 bg-gradient-to-br from-white/5 to-transparent rounded-3xl border border-white/10">
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-widest text-[#c5a059]">
                    {lang === 'EN' ? 'Client Feedback' : 'رأي العميل'}
                  </h4>
                  <p className="text-gray-400 text-sm mb-6">
                    {lang === 'EN' ? 'We value your input. Please rate this concept and leave your notes below.' : 'نحن نقدر رأيك. يرجى تقييم هذا التصميم وترك ملاحظاتك أدناه.'}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} className="text-[#c5a059] hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        </button>
                      ))}
                    </div>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-[#c5a059] focus:outline-none transition-colors h-24"
                      placeholder={lang === 'EN' ? 'Enter your comments here...' : 'اكتب ملاحظاتك هنا...'}
                    ></textarea>
                    <button className="px-8 py-3 bg-[#c5a059] text-[#020408] font-bold rounded-xl uppercase text-xs tracking-widest hover:bg-[#f9d423] transition-colors">
                      {lang === 'EN' ? 'Submit Feedback' : 'إرسال الرأي'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex items-center gap-4">
          <span>Sovereign Intelligence Unit © 2026</span>
          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
          <span>EL_NAFEER FISCAL PROTOCOL</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#c5a059] transition-colors">Privacy Shield</a>
          <a href="#" className="hover:text-[#c5a059] transition-colors">Audit Logs</a>
          <a href="#" className="hover:text-[#c5a059] transition-colors">Contact Intelligence</a>
        </div>
      </footer>
    </div>
  );
}
