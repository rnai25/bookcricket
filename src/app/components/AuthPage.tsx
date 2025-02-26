'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import SignInButton from './SignInButton';

const AuthPage = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Book Cricket</h1>
          <p className="text-xl text-white animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">Book Cricket</h1>
        <p className="text-xl text-white mb-8">
          Experience the nostalgia of book cricket in a modern way!
        </p>
        <SignInButton />
      </div>
    </div>
  );
};

export default AuthPage; 