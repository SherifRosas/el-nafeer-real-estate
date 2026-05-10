import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'بيت الخير للتطوير العقاري | مشاريع القصور الفاخرة بطوخ',
  description: 'الشركة الرائدة في التطوير العقاري بالقليوبية. احجز شقتك الفاخرة أو وحدتك في قصور بيت الخير (القصر ١٨، القصر ١٩، القصر ٢١) بأفضل خطط تقسيط وتقنية المنازل الذكية.',
  openGraph: {
    title: 'بيت الخير للتطوير العقاري | القليوبية',
    description: 'اكتشف الفخامة في قلب طوخ. مساحات تبدأ من ١٥٠ إلى ٢٤٠ متر مع أنظمة الذكاء الاصطناعي.',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: 'https://el-nafeer-real-estate.vercel.app/og-beit-alkhair.png',
        width: 1200,
        height: 630,
        alt: 'Beit Al-Khair Real Estate'
      }
    ]
  }
}

export default function BeitAlKhairLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
