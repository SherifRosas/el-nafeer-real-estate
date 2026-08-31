import AdminScreenUploader from "@/components/AdminScreenUploader"
import AdminScreenList from "@/components/AdminScreenList"
import AdminLogoutButton from "@/components/AdminLogoutButton"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: 'Upload Screen | Admin Dashboard',
}

export default async function ScreenUploaderPage() {
  const session = await getServerSession(authOptions)
  const userRole = (session?.user as any)?.role

  if (!session || (userRole !== 'screen-admin' && userRole !== 'main-admin')) {
    redirect('/admin/login?callbackUrl=/admin/screen-uploader')
  }

  const screens = await prisma.screen.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid #334155", paddingBottom: "1rem" }}>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>
            📺 Screen Management
          </h1>
          <AdminLogoutButton />
        </div>
        
        <AdminScreenUploader />
        
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid #334155" }}>
          <AdminScreenList screens={screens} />
        </div>
      </div>
    </div>
  )
}
