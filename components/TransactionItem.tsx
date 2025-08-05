// src/components/TransactionItem.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Link } from 'expo-router';

interface TransactionItemProps {
  invoiceId: string;
  date: string;
  amount: number;
  name: string;
  transactionStatus: string;
  paymentType: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ invoiceId, date, amount, transactionStatus, paymentType }) => {
  console.log('Transaction Item:', { invoiceId, date, amount, transactionStatus, paymentType });
  return (
    <Link href={`/transaction/${invoiceId}`} asChild>
      <Card style={styles.card}>
        <Card.Content>
          <Title>#{invoiceId}</Title>
          <Paragraph>{new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}</Paragraph>
          <Paragraph>Rp. {amount.toLocaleString()}</Paragraph>
          <Paragraph>Status Transaksi: {transactionStatus}</Paragraph>
          <Paragraph>Jenis Pembayaran: {paymentType}</Paragraph>
        </Card.Content>
      </Card>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
});

export default TransactionItem;