// app/screens/TicketScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import TicketItem from '../../../components/TicketItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { useRouter } from 'expo-router';
import BackButton from '~/components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPackages } from '~/utils/firestore';


interface cart {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const TicketScreen: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [tickets, setTickets] = useState<cart[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const packages = await getPackages();
        setTickets(packages);
      } catch (error) {
        console.error("Error fetching tickets: ", error);
      }
    };

    fetchTickets();
  }, []);
  const handleAdd = (id: string, name: string, price: number) => {
    dispatch(addItem({
      id,
      name,
      price,
      quantity: 1
    }));
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <BackButton title="Ticket" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          {tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              name={ticket.name}
              price={ticket.price}
              imageUrl={ticket.imageUrl}
              onAdd={() => handleAdd(ticket.id, ticket.name, ticket.price)}
            />
          ))}
        </View>
        <View style={styles.cartContainer}>
          <Text style={styles.cartText}>Items: {cart.items.length}</Text>
          <Text style={styles.cartText}>Total: Rp. {cart.totalPrice.toLocaleString()}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push('../Checkout/CheckoutScreen')}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00BCD4',
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
  checkoutButtonText: {
    color: '#00BCD4',
    fontSize: 20,
  },
});

export default TicketScreen;
