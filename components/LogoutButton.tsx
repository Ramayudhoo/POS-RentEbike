import React from 'react';
import { useAuth } from '../provider/AuthProvider';
import { useRouter } from 'expo-router';
import Button from './Button';
import colors from '~/constants/color';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const LogoutButton: React.FC = () => {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (user) {
      try {
        await signOut();
        console.log('Berhasil logout');
        router.push('/(auth)/Login');
      } catch (error) {
        console.error('Gagal logout', error);
      }
    }
  };

  return (
    <TouchableOpacity 
    onPress={handleLogout}
    disabled={loading}
    style={styles.logoutButton}>
        <Text style={styles.logoutText}>LOGOUT</Text>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
    logoutButton: {
      backgroundColor: colors.card,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginVertical: 10,
      alignItems: 'center',
      width: 300, // Adjust the width as needed
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    },
  
})

export default LogoutButton;