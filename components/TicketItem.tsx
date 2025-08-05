//components/TicketItem.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import colors from '~/constants/color';

interface TicketItemProps {
  name: string;
  price: number;
  imageUrl: string;
  onAdd: () => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ name, price, imageUrl, onAdd }) => {
  return (
    <Card style={styles.card} onPress={onAdd}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
          {name}
        </Text>
        <Text style={styles.price}>Rp. {price.toLocaleString()}</Text>
      </View>
      <Button icon="plus" mode="contained" onPress={onAdd} style={styles.addButton}>
        Add
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  addButton: {
    marginTop: 8,
    backgroundColor: colors.card,
  },
});

export default TicketItem;
