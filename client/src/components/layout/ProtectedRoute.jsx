import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-64px)]'>
        <LoadingSpinner size='lg' className='text-indigo-600' />
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
