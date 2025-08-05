import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { WebView } from 'react-native-webview';
import { db } from '~/utils/firebase'; // Sesuaikan path import dengan file firebase.ts
import { collection, addDoc } from 'firebase/firestore';

const PaymentScreen: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart); // Mengambil state cart dari Redux store
  const [orderId] = useState(`order-${Date.now()}`); // Menghasilkan orderId unik menggunakan timestamp
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState<any[]>([]);
  const [paymentType, setPaymentType] = useState<string>('qris'); // Default payment type

  const totalPrice = cart.items.reduce((acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity, 0);

  const saveTransactionToFirebase = async (data: any) => {
    try {
      await addDoc(collection(db, 'transactions'), data);
      console.log('Transaction saved to Firebase');
    } catch (error) {
      console.error('Error saving transaction to Firebase:', error);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    console.log("Cart items:", cart.items);
    const itemDetails = cart.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    setItemDetails(itemDetails); // Set item details state

    const data = {
      item_details: itemDetails,
      transaction_details: {
        order_id: orderId,
        gross_amount: totalPrice
      },
      payment_type: paymentType // Include payment type in data
    };
    console.log("Sending data:", data);

    try {
      // Ganti localhost dengan URL Vercel Anda
      const response = await fetch('https://pos-coba-solo.vercel.app/api/payment', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const requestData = await response.json();
      console.log({ requestData });
      if (response.ok) {
        setPaymentToken(requestData.token);
        await saveTransactionToFirebase({
          invoiceId: orderId,
          date: new Date().toISOString(),
          amount: totalPrice,
          name: cart.items.map(item => item.name).join(', '), // Menambahkan nama barang yang dipilih
          item_details: itemDetails // Menambahkan detail barang
        });
      } else {
        Alert.alert('Payment Error', requestData.error || 'Unknown error occurred');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      Alert.alert('Payment Error', 'There was an error processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentToken) {
    // Render QRIS payment
    if (Platform.OS === 'web') {
      return (
        <iframe
          src={`https://app.sandbox.midtrans.com/snap/v2/vtweb/${paymentToken}`}
          style={{ width: '100%', height: '100vh', border: 'none' }}
          title="Payment"
        />
      );
    } else {
      return (
        <WebView
          source={{ uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${paymentToken}` }}
          style={styles.webview}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
    <Text>Order ID: {orderId}</Text>
    <Text>Total Price: Rp. {totalPrice.toLocaleString()}</Text>
    <Text>Payment Type: {paymentType}</Text>
    <Text>Item Details:</Text>
    {itemDetails.map((item, index) => (
      <Text key={index}>
        {`${item.name} - ${item.quantity} x Rp. ${item.price.toLocaleString()}`}
      </Text>
    ))}
    <View style={{ marginTop: 20 }}>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
    {loading && <ActivityIndicator size="large" color="#0000ff" />}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});

export default PaymentScreen;