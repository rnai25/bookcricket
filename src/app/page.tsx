'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import BookCricket from '@/app/components/BookCricket';

export default function Home() {
  return (
    <ProtectedRoute>
      <BookCricket />
    </ProtectedRoute>
  );
}