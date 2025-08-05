import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';
import colors from '../constants/color';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartComponentProps {
  item: CartItem;
  onAdd: () => void;
  onRemove: () => void;
}

const CartComponent: React.FC<CartComponentProps> = ({ item, onAdd, onRemove }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <IconButton icon="minus" size={20} onPress={onRemove} />
          <Text style={styles.quantity}>{item.quantity}</Text>
          <IconButton icon="plus" size={20} onPress={onAdd} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: colors.text,
  },
  price: {
    fontSize: 14,
    color: colors.accent,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    color: colors.text,
    marginHorizontal: 10,
  },
});

export default CartComponent;
