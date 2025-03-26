import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/login" />;
  
  return <>{children}</>;
};
