'use client'

import { usePathname } from 'next/navigation'
import MasterFooter from "@/components/MasterFooter"

export default function PortalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPortal = pathname?.includes('/portal/') || pathname?.includes('/lever-pioneer/')

  return (
    <>
      {children}
      {!isPortal && <MasterFooter />}
    </>
  )
}
