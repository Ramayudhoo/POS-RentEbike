import React from 'react';
import { View, StyleSheet } from 'react-native';
import CheckoutForm from '../../../components/CheckoutForm';
import BackButton from '~/components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
    <SafeAreaView/>
    <BackButton title="Checkout" />
      <CheckoutForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CheckoutScreen;
