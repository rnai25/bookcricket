'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import Link from 'next/link'

export default function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-emerald-900 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-yellow-400 text-2xl font-bold">
          Book Cricket
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-white">{user.email}</span>
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-3 py-1 text-sm rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  )
} 