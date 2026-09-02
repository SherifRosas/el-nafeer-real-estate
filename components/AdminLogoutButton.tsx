'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function AdminLogoutButton({ className = '' }: { className?: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-all font-bold text-xs ${className}`}
      title="تسجيل الخروج"
    >
      <LogOut size={16} />
      <span>تسجيل الخروج</span>
    </button>
  )
}
