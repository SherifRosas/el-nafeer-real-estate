import ContentProtection from '@/components/ContentProtection'
import AIChatbot from '@/components/AIChatbot'
import HomeContent from '@/components/HomeContent'
import NavigationHeader from '@/components/NavigationHeader'

export default async function HomePage() {
  return (
    <>
      <ContentProtection />
      <div className="min-h-screen bg-[#020202] text-white">
        <NavigationHeader />

        {/* Global HUD Frame Accents */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-10 left-10 w-32 h-32 border-t border-l border-cyan-500/20" />
          <div className="absolute top-10 right-10 w-32 h-32 border-t border-r border-cyan-500/20" />
          <div className="absolute bottom-10 left-10 w-32 h-32 border-b border-l border-cyan-500/20" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border-b border-r border-cyan-500/20" />
        </div>

        {/* Main Content Node */}
        <main className="relative">
          <HomeContent />
        </main>

        <AIChatbot />
      </div>
    </>
  )
}

