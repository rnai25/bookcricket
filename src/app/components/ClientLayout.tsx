'use client';

import { AuthProvider } from '@/lib/contexts/AuthContext';
import { useAuth } from '@/lib/hooks/useAuth';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Don't show loading state on auth page to prevent flicker
  if (loading && pathname !== '/auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-800/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-3 text-emerald-800">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 