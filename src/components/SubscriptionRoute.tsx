import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const SubscriptionRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, hasActiveSubscription } = useAuth();
  
  if (loading) return null;
  
  // If no user, redirect to login
  if (!user) return <Navigate to="/login" />;
  
  // If user has no active subscription, redirect to subscription page
  if (!hasActiveSubscription) return <Navigate to="/subscription" />;
  
  return <>{children}</>;
}; 