import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

interface BarcodeScannerProps {
  onBarcodeScanned: (data: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeScanned }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={({ data }) => onBarcodeScanned(data)}
         barcodeScannerSettings={{
          barcodeTypes: ['qr',],
       }}
      />
      <View style={styles.overlay}>
        <View style={styles.frame}>
          <View style={styles.innerFrame} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: '80%',
    height: '50%',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerFrame: {
    width: '90%',
    height: '90%',
    borderColor: '#00BCD4',
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default BarcodeScanner;
