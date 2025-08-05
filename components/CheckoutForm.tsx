import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/redux/store';
import { removeItem, addItem, reduceItem } from '../app/redux/slices/cartSlice';
import { router } from 'expo-router';
import colors from '~/constants/color';

const CheckoutForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (selectedPaymentMethod) {
      setModalVisible(false);

      // Create Doku transaction
      const orderId = `order-${Date.now()}`;
      const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

      try {
        router.push({
          pathname: '/payment/PaymentScreen',
        });
      } catch (error) {
        console.error('Error creating transaction:', error);
        alert('Failed to create transaction. Please try again.');
      }
    } else {
      alert('Please select a payment method');
    }
  };

  const handleAddItem = (item: any) => {
    dispatch(addItem({ ...item, quantity: 1 }));
  };

  const handleRemoveItem = (item: any) => {
    dispatch(removeItem(item));
  };
  const handleReduceItem = (item: any) => {
    dispatch(reduceItem(item.id)); // Mengirimkan hanya id item
  };

  // Calculate total price
  const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.itemControls}>
              <TouchableOpacity onPress={() => handleReduceItem(item)}>
                <Text style={styles.controlButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.itemQuantity}>{item.quantity} Pc(s)</Text>
              <TouchableOpacity onPress={() => handleAddItem(item)}>
                <Text style={styles.controlButton}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemPrice}>Rp. {item.price.toLocaleString()}</Text>
          </View>
        )}
      />
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Barang: {cart.items.reduce((acc, item) => acc + item.quantity, 0)} Pc(s)</Text>
        <Text style={styles.summaryText}>Total Harga: Rp. {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose Payment Method:</Text>
            <TouchableOpacity
              style={[styles.paymentOption, selectedPaymentMethod === 'qris' && styles.selectedOption]}
              onPress={() => setSelectedPaymentMethod('qris')}
            >
              <Text style={styles.optionText}>QRIS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentOption, selectedPaymentMethod === 'bank' && styles.selectedOption]}
              onPress={() => setSelectedPaymentMethod('bank')}
            >
              <Text style={styles.optionText}>Bank Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleCheckout}>
              <Text style={styles.modalButtonText}>Proceed with Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  itemQuantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
  },
  summary: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  paymentOption: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: colors.card,
    borderColor: colors.card,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.card,
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CheckoutForm;