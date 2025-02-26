'use client';

import { useState } from 'react';
import { signInWithGoogle } from '@/lib/firebase/firebaseUtils';

const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`
        bg-emerald-600 hover:bg-emerald-700
        text-white font-semibold
        px-8 py-4 rounded-lg
        transition-all duration-200
        flex items-center gap-3
        text-lg
        shadow-lg hover:shadow-xl
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:scale-105'}
      `}
    >
      {isLoading ? (
        'Signing in...'
      ) : (
        <>
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Sign in with Google
        </>
      )}
    </button>
  );
};

export default SignInButton; 