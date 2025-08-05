// src/components/PaketItem.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

interface PaketItemProps {
  name: string;
  price: number;
  imageUrl: string;
  onAdd: () => void;
  onRemove: () => void;
}

const PaketItem: React.FC<PaketItemProps> = ({ name, price, imageUrl, onAdd, onRemove }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imageUrl }} />
      <Card.Content>
        <Text variant="titleLarge">{name}</Text>
        <Text variant="bodyLarge">{name} Rp. {price.toLocaleString()}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={onRemove}>Remove</Button>
        <Button mode="contained" onPress={onAdd}>Add</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default PaketItem;
