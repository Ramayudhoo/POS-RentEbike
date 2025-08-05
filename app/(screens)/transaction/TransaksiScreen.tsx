import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchTransactions } from '../../redux/slices/transactionSlice';
import TransactionItem from '../../../components/TransactionItem';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '~/components/BackButton';

const TransaksiScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading, error } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    console.log('Fetching transactions...');
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    console.log('Transactions:', transactions);
  }, [transactions]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text>Error: {error}</Text>
        <Button onPress={() => {
          console.log('Retrying to fetch transactions...');
          dispatch(fetchTransactions());
        }} title="Retry" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton title="Transaksi" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaksi</Text>
      </View>
      <Text style={styles.dateRange}>Dari tanggal 16-07-2024 sampai 16-08-2024</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            invoiceId={item.invoiceId}
            date={item.date}
            name={item.name}
            transactionStatus={item.transaction_status}
            paymentType={item.payment_type}
            amount={item.amount}
          />
        )}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateRange: {
    textAlign: 'center',
    paddingBottom: 16,
    color: '#666',
  },
});

export default TransaksiScreen;