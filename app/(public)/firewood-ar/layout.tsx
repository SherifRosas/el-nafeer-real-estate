import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'حطب أفريقي مستورد وفحم شواء | ناركو - توصيل جميع مدن السعودية',
  description: 'ناركو - أفضل أنواع الحطب الأفريقي المستورد والفحم للشواء والتدفئة في السعودية. عروض جملة حصرية، جودة احتراق فائقة، وتوصيل سريع لجميع المناطق.',
  keywords: ['حطب أفريقي', 'حطب سمر', 'فحم شواء', 'فحم جملة', 'حطب للتدفئة', 'ناركو', 'توصيل حطب', 'حطب مستورد', 'حطب السعودية', 'فحم فاخر', 'حطب مطاعم', 'فحم مشاوي'],
  openGraph: {
    title: 'حطب أفريقي مستورد وفحم شواء | ناركو',
    description: 'أفضل أنواع الحطب الأفريقي المستورد والفحم للشواء والتدفئة في السعودية. عروض جملة حصرية.',
    url: 'https://el-nafeer-real-estate.vercel.app/%D8%AD%D8%B7%D8%A8-%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A',
    siteName: 'ناركو للحطب والفحم الإفريقي',
    images: [
      {
        url: 'https://el-nafeer-real-estate.vercel.app/campaigns/narco/logo.jpg',
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
    images: ['https://el-nafeer-real-estate.vercel.app/campaigns/narco/logo.jpg'],
  },
  alternates: {
    canonical: 'https://el-nafeer-real-estate.vercel.app/%D8%AD%D8%B7%D8%A8-%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A',
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
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "مؤسسة ناركو لتجارة الحطب والفحم الإفريقي",
    "url": "https://el-nafeer-real-estate.vercel.app/حطب-أفريقي",
    "logo": "https://el-nafeer-real-estate.vercel.app/campaigns/narco/logo.jpg",
    "image": "https://el-nafeer-real-estate.vercel.app/campaigns/narco/logo.jpg",
    "description": "أفضل أنواع الحطب الأفريقي المستورد والفحم للشواء والتدفئة في السعودية. عروض جملة حصرية وتوصيل سريع.",
    "telephone": "+966559715915",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "الرياض",
      "addressRegion": "منطقة الرياض",
      "addressCountry": "SA"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "paymentAccepted": "Cash, Mada, STC Pay, Bank Transfer",
    "areaServed": ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam"]
  };

  const firewood10kgSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "كيس حطب سمر أفريقي 10 كجم - ناركو",
    "image": ["https://el-nafeer-real-estate.vercel.app/campaigns/narco/10kg_sack.jpg"],
    "description": "حطب سمر أفريقي فاخر للتدفئة. جودة عالية، سريع الاشتعال في كيس وزن 10 كجم للعائلات والمخيمات.",
    "brand": { "@type": "Brand", "name": "ناركو (Narco)" },
    "offers": {
      "@type": "Offer",
      "url": "https://el-nafeer-real-estate.vercel.app/حطب-أفريقي",
      "priceCurrency": "SAR",
      "price": "32",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  const firewood5kgSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "كيس حطب سمر أفريقي 5 كجم - ناركو",
    "image": ["https://el-nafeer-real-estate.vercel.app/campaigns/narco/5kg_sack.jpg"],
    "description": "حطب سمر أفريقي فاخر في كيس وزن 5 كجم. مثالي للرحلات السريعة والشواء السهل.",
    "brand": { "@type": "Brand", "name": "ناركو (Narco)" },
    "offers": {
      "@type": "Offer",
      "url": "https://el-nafeer-real-estate.vercel.app/حطب-أفريقي",
      "priceCurrency": "SAR",
      "price": "18",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "ما هو حطب السمر الأفريقي وما هي مميزاته؟",
        "acceptedAnswer": { "@type": "Answer", "text": "حطب السمر الأفريقي هو من أجود أنواع الحطب المستخدم للتدفئة والشواء. يتميز بسرعة اشتعاله، وقوة حرارته، وطول فترة بقائه جمراً، بالإضافة إلى قلة الدخان المنبعث منه." }
      },
      {
        "@type": "Question",
        "name": "هل تقومون بالتوصيل لجميع مناطق المملكة؟",
        "acceptedAnswer": { "@type": "Answer", "text": "نعم، نقدم خدمة توصيل آمنة وسريعة لجميع مناطق المملكة العربية السعودية. أسطولنا يغطي الرياض، جدة، الدمام، وكافة المدن الكبرى لضمان وصول طلبك في أسرع وقت." }
      },
      {
        "@type": "Question",
        "name": "ما هي أسعار الجملة للكميات الكبيرة؟",
        "acceptedAnswer": { "@type": "Answer", "text": "نوفر أسعاراً تنافسية جداً وعروضاً خاصة لطلبات الجملة للمطاعم، والمقاهي، والمخيمات. يرجى التواصل معنا عبر الواتساب للحصول على تسعيرة دقيقة بناءً على الكمية المطلوبة." }
      },
      {
        "@type": "Question",
        "name": "هل فحم ناركو مناسب للشواء في المطاعم؟",
        "acceptedAnswer": { "@type": "Answer", "text": "بالتأكيد. فحم ناركو الأفريقي نخب أول، مثالي للمطاعم والمشويات الاحترافية. يعطي حرارة عالية وثابتة، ولا يترك رماداً كثيفاً، مما يحافظ على طعم اللحم الأصلي." }
      },
      {
        "@type": "Question",
        "name": "هل يمكنني طلب عينات لتجربة الجودة قبل الشراء بكميات؟",
        "acceptedAnswer": { "@type": "Answer", "text": "نعم، نحن نثق في جودة منتجاتنا. يمكن ترتيب إرسال عينات تجريبية للمطاعم والتجار والمشترين بالجملة. تواصل مع فريق المبيعات لتنسيق ذلك." }
      },
      {
        "@type": "Question",
        "name": "ما هي طرق الدفع المتاحة لديكم؟",
        "acceptedAnswer": { "@type": "Answer", "text": "نقبل الدفع النقدي (كاش)، مدى، STC Pay، والتحويل البنكي. نحرص على توفير خيارات مرنة لتسهيل عملية الشراء لعملائنا." }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://el-nafeer-real-estate.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "ناركو - حطب أفريقي",
        "item": "https://el-nafeer-real-estate.vercel.app/حطب-أفريقي"
      }
    ]
  };

  return (
    <>
      <meta name="geo.region" content="SA" />
      <meta name="geo.placename" content="Riyadh" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(firewood10kgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(firewood5kgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
