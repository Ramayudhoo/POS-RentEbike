import React from 'react';
import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="Antrian/AntrianScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Barcode/ScanBarcodeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Checkout/CheckoutScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Home/HomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Setting/SettingScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Ticket/TicketScreen" options={{ headerShown: false }} />
      <Stack.Screen name="transaction/TransaksiScreen" options={{ headerShown: false }} />
      <Stack.Screen name="transaction/[invoiceId]" options={{ headerShown: false }} />
    </Stack>
  );
}
