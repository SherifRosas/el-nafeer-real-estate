import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'حطب أفريقي مستورد وفحم شواء | ناركو - توصيل جميع مدن السعودية',
  description: 'ناركو - أفضل أنواع الحطب الأفريقي المستورد والفحم للشواء والتدفئة في السعودية. عروض جملة حصرية، جودة احتراق فائقة، وتوصيل سريع لجميع المناطق.',
  keywords: ['حطب أفريقي', 'حطب سمر', 'فحم شواء', 'فحم جملة', 'حطب للتدفئة', 'ناركو', 'توصيل حطب', 'حطب مستورد', 'حطب السعودية', 'فحم فاخر', 'حطب مطاعم', 'فحم مشاوي'],
  openGraph: {
    title: 'حطب أفريقي مستورد وفحم شواء | ناركو',
    description: 'أفضل أنواع الحطب الأفريقي المستورد والفحم للشواء والتدفئة في السعودية. عروض جملة حصرية.',
    url: 'https://el-nafeer-systems.vercel.app/%D8%AD%D8%B7%D8%A8-%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A',
    siteName: 'ناركو للحطب والفحم الإفريقي',
    images: [
      {
        url: 'https://el-nafeer-systems.vercel.app/campaigns/narco/logo.jpg',
        width: 800,
        height: 800,
        alt: 'شعار مؤسسة ناركو لتجارة الحطب والفحم الإفريقي',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'حطب أفريقي مستورد وفحم شواء | ناركو',
    description: 'أفضل أنواع الحطب الأفريقي المستورد والفحم للشواء والتدفئة في السعودية.',
    images: ['https://el-nafeer-systems.vercel.app/campaigns/narco/logo.jpg'],
  },
  alternates: {
    canonical: 'https://el-nafeer-systems.vercel.app/%D8%AD%D8%B7%D8%A8-%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function NarcoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <meta name="geo.region" content="SA" />
      <meta name="geo.placename" content="Riyadh" />
      {children}
    </>
  );
}
