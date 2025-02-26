// src/app/layout.tsx
import ClientLayout from './components/ClientLayout';
import { Metadata } from 'next';
import './globals.css';  // Add this import for Tailwind CSS
import { AuthProvider } from '@/lib/contexts/AuthContext';  // Make sure this import exists

export const metadata: Metadata = {
  title: 'Book Cricket',
  description: 'Experience the nostalgia of book cricket in a modern way!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}