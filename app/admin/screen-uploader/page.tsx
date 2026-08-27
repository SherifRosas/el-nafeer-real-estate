import AdminScreenUploader from "@/components/AdminScreenUploader"
import AdminScreenList from "@/components/AdminScreenList"
import { prisma } from "@/lib/db"

export const metadata = {
  title: 'Upload Screen | Admin Dashboard',
}

export default async function ScreenUploaderPage() {
  const screens = await prisma.screen.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "2rem", borderBottom: "1px solid #334155", paddingBottom: "1rem" }}>
          📺 Screen Management
        </h1>
        
        <AdminScreenUploader />
        
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid #334155" }}>
          <AdminScreenList screens={screens} />
        </div>
      </div>
    </div>
  )
}
