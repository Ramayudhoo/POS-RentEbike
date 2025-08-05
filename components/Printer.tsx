import React from 'react';
import { View, Alert, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import ThermalPrinterModule from 'react-native-thermal-printer';
import colors from '~/constants/color';

interface PrintButtonProps {
  closingShiftData: {
    startDate: string;
    endDate: string;
    totalRevenue: number;
  } | null;
}

const PrintButton: React.FC<PrintButtonProps> = ({ closingShiftData }) => {
  const printReceipt = async () => {
    if (!closingShiftData) {
      Alert.alert('Error', 'No closing shift data available');
      return;
    }

    try {
      const printData = `
        <h1>My Store</h1>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Start Date: ${closingShiftData.startDate}</p>
        <p>End Date: ${closingShiftData.endDate}</p>
        <p>Total Revenue: Rp. ${closingShiftData.totalRevenue.toLocaleString()}</p>
      `;

      // Konfigurasi printer Bluetooth
      await ThermalPrinterModule.printBluetooth({
        payload: printData,
        autoCut: true,
        openCashbox: false,
        mmFeedPaper: 0,
        printerDpi: 203, // Ganti sesuai dengan printer Anda
        printerWidthMM: 80, // Ganti sesuai dengan printer Anda
        printerNbrCharactersPerLine: 32, // Ganti sesuai dengan printer Anda
      });

      Alert.alert('Success', 'Receipt has been printed');
    } catch (error: any) {
      console.error('Error printing receipt:', error.message);
      Alert.alert('Error', 'Failed to print receipt');
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={printReceipt} style={styles.printButton}>
        <Text style={styles.buttonText}>PRINT RECEIPT</Text>
        </TouchableOpacity>
        {closingShiftData && (
          <View>
            <Text>Start Date: {closingShiftData.startDate}</Text>
            <Text>End Date: {closingShiftData.endDate}</Text>
            <Text>Total Revenue: Rp. {closingShiftData.totalRevenue.toLocaleString()}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  printButton: {
    backgroundColor: colors.card,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
export default PrintButton;