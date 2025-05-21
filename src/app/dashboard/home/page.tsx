'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div>
          <p>Welcome, {user?.first_name || 'User'}</p>
          {/* Contenido del dashboard */}
        </div>
      </div>
    </ProtectedRoute>
  );
}