import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';

const DetailTransactionScreen: React.FC = () => {
  const { invoiceId } = useLocalSearchParams<{ invoiceId: string }>();
  const transaction = useSelector((state: RootState) =>
    state.transactions.transactions.find((trans) => trans.invoiceId === invoiceId)
  );

  useEffect(() => {
    console.log('Invoice ID:', invoiceId);
    console.log('Transaction:', transaction);
  }, [invoiceId, transaction]);

  if (!transaction) {
    return (
      <View style={styles.loader}>
        <Text>Transaction not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Detail Barang</Title>
          <Paragraph>#{transaction.invoiceId}</Paragraph>
          <Paragraph>Price: Rp. {transaction.amount.toLocaleString()}</Paragraph>
          <Paragraph>Payment Type: {transaction.paymentmethod}</Paragraph>
          <Paragraph>Detail Barang: {transaction.item_details.map(item => item.name).join(', ')}</Paragraph>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={() => console.log('Print receipt')}>
        Print Struk
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailTransactionScreen;