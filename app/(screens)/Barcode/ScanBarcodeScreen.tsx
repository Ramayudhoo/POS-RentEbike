import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import BarcodeScanner from "../../../utils/barcodescanner";
import {
  setBarcodeData,
  clearBarcodeData,
} from "../../redux/slices/barcodeSlice";
import { RootState } from "../../redux/store";

import BackButton from "~/components/BackButton";
import colors from "~/constants/color";

const ScanBarcodeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const barcode = useSelector((state: RootState) => state.barcode.barcodeData);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedLoket, setSelectedLoket] = useState("");

  const handleBarcodeScanned = (data: string) => {
    setIsScanning(false);
    dispatch(setBarcodeData(data));
  };

  const handleScanButtonPress = () => {
    setIsScanning(true);
    dispatch(clearBarcodeData());
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <BackButton title="Barcode" />
      {isScanning ? (
        <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
      ) : (
        <>
          <Text style={styles.label}>Loket</Text>
          <TextInput
            style={styles.input}
            placeholder="Pilih Loket"
            value={selectedLoket}
            onChangeText={setSelectedLoket}
          />
          <Text style={styles.label}>Masukkan Barcode</Text>
          <TextInput
            style={styles.input}
            placeholder="Barcode"
            value={barcode}
            onChangeText={(text) => dispatch(setBarcodeData(text))}
          />
          <Button
            mode="contained"
            onPress={handleScanButtonPress}
            style={styles.scanButton}
          >
            Scan Barcode
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  scanButton: {
    marginTop: 16,
    backgroundColor: colors.card,
  },
});

export default ScanBarcodeScreen;
