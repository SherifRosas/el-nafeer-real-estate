import { db } from '@/lib/supabase'
import NavigationHeader from '@/components/NavigationHeader'
import PublicPropertiesContent from '@/components/PublicPropertiesContent'
import AIChatbot from '@/components/AIChatbot'

export const dynamic = 'force-dynamic'

export default async function PublicPropertiesPage() {
    const properties = await db.getPublicProperties() || []

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <NavigationHeader />

            <main className="relative">
                <PublicPropertiesContent properties={properties} />
            </main>

            <AIChatbot />
        </div>
    )
}
