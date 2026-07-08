import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ليفر الرائدة للمصاعد تركيب • صيانة • توريد',
    description: '-سجل تجاري رقم 23012-الدقهليه المنصوره مركز ومدينة السنبلاوين',
    icons: {
        icon: '/favicon.svg',
    },
    openGraph: {
        title: 'ليفر الرائدة للمصاعد تركيب • صيانة • توريد',
        description: '-سجل تجاري رقم 23012-الدقهليه المنصوره مركز ومدينة السنبلاوين',
        images: [
            {
                url: 'https://el-nafeer-real-estate.vercel.app/lever-pioneer-share.png',
                width: 1200,
                height: 630,
                alt: 'ليفر الرائدة للمصاعد'
            }
        ]
    }
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
