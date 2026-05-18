import ContentProtection from '@/components/ContentProtection'
import AIChatbot from '@/components/AIChatbot'
import HomeContent from '@/components/HomeContent'

export default async function HomePage() {
  return (
    <>
      <ContentProtection />
      <div className="min-h-screen bg-[#020408] text-white">
        {/* Main Content Node */}
        <main className="relative">
          <HomeContent />
        </main>

        <AIChatbot />
      </div>
    </>
  )
}
