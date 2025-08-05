import React from 'react';
import { useAuth } from '../provider/AuthProvider';
import { Redirect } from 'expo-router';

const Index: React.FC = () => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return null; // atau tambahkan indikator loading
  }

  if (!user) {
    return <Redirect href="/(auth)/Login" />;
  }

  if (role === 'admin') {
    return <Redirect href="/(screens)/admin/Dashboard" />;
  }

  return <Redirect href="/(screens)/HomeScreen" />;
};

export default Index;
