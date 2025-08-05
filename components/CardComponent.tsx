import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import colors from '../constants/color';

interface CardComponentProps {
  title: string;
  icon: string;
  onPress?: () => void;
  href: string;
  style?: object;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, icon, onPress, href, style }) => {
  return (
    <Link href={href} asChild>
      <Card style={styles.card} onPress={onPress}>
        <View style={styles.content}>
          <Icon name={icon} size={50} color={colors.text} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </Card>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: colors.card, // Ganti dengan warna yang lebih cerah
    borderRadius: 15, // Border radius yang lebih besar
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Tambahkan bayangan
    padding: 20, // Tambahkan padding
  },
  content: {
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    color: colors.text,
    fontSize: 18, // Ukuran font yang lebih besar
    fontWeight: 'bold', // Tambahkan ketebalan font
  },
});

export default CardComponent;