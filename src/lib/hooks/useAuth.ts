'use client';

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const signOut = async () => {
  try {
    await auth.signOut();
    // Clear any local storage or state if present
    localStorage.clear();
    // Force reload the page to clear all state
    window.location.href = '/';
  } catch (error) {
    console.error('Error signing out:', error);
  }
};