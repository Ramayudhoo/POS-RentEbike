import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '~/utils/firebase'; // Ganti path sesuai lokasi file firebaseConfig.ts
import BackButton from '~/components/BackButton';
import PrintButton from '~/components/Printer'; // Import komponen PrintButton
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoutButton from '~/components/LogoutButton'; // Import komponen LogoutButton
import colors from '~/constants/color';

interface ClosingShiftData {
  startDate: string;
  endDate: string;
  totalRevenue: number;
}

const SettingScreen: React.FC = () => {
  const [closingShiftData, setClosingShiftData] = useState<ClosingShiftData | null>(null);

  const handleCloseShift = async () => {
    const startDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
    const endDate = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

    try {
      const transactionsSnapshot = await getDocs(
        query(
          collection(db, 'transactions'),
          where('date', '>=', startDate),
          where('date', '<=', endDate)
        )
      );

      let totalRevenue = 0;
      transactionsSnapshot.forEach(doc => {
        totalRevenue += doc.data().amount;
      });

      // Simpan hasil tutup buku ke Firestore
      await addDoc(collection(db, 'closingShifts'), {
        startDate,
        endDate,
        totalRevenue,
        timestamp: new Date(),
      });

      setClosingShiftData({ startDate, endDate, totalRevenue });

      Alert.alert('Success', `Total revenue for the period from ${startDate} to ${endDate} is ${totalRevenue}`);
    } catch (error) {
      console.error('Error closing shift:', error);
      Alert.alert('Error', 'Failed to close shift');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton title="Setting" />
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCloseShift}>
          <Text style={styles.buttonText}>CLOSE SHIFT</Text>
        </TouchableOpacity>
        <PrintButton
          closingShiftData={closingShiftData}
        />
        <LogoutButton
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  button: {
    backgroundColor: colors.card,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: 300, // Adjust the width as needed
  },
  logoutButton: {
    backgroundColor: colors.card,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: 200, // Adjust the width as needed
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingScreen;
