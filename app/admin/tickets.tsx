// app/admin/tickets.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button, ActivityIndicator, FAB, Dialog, Portal, TextInput } from 'react-native-paper';
import { getPackages } from '~/utils/firestore';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '~/utils/firebase';
import * as ImagePicker from 'expo-image-picker'; // Ganti import dengan expo-image-picker

interface Package {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const TicketManagementScreen: React.FC = () => {
  const [tickets, setTickets] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Package | null>(null);
  const [ticketData, setTicketData] = useState({ id: '', name: '', price: '', imageUrl: '' });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const packages = await getPackages();
      setTickets(packages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets: ", error);
      setLoading(false);
    }
  };

  const handleAddTicket = async () => {
    try {
      await addDoc(collection(db, 'packages'), ticketData);
      fetchTickets();
      setDialogVisible(false);
      setTicketData({ id:'', name: '', price: '', imageUrl: '' });
    } catch (error) {
      console.error("Error adding ticket: ", error);
    }
  };

  const handleUpdateTicket = async () => {
    if (selectedTicket) {
      try {
        const ticketRef = doc(db, 'packages', selectedTicket.id);
        await updateDoc(ticketRef, ticketData);
        fetchTickets();
        setDialogVisible(false);
        setTicketData({ id:'', name: '', price: '', imageUrl: '' });
        setSelectedTicket(null);
      } catch (error) {
        console.error("Error updating ticket: ", error);
      }
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    try {
      await deleteDoc(doc(db, 'packages', ticketId));
      fetchTickets();
    } catch (error) {
      console.error("Error deleting ticket: ", error);
    }
  };

  const openDialog = (ticket: Package | null = null) => {
    setSelectedTicket(ticket);
    setTicketData(ticket ? { id: ticket.id, name: ticket.name, price: ticket.price.toString(), imageUrl: ticket.imageUrl } : { id:'', name: '', price: '', imageUrl: '' });
    setDialogVisible(true);
  };

  const handleSelectImage = async () => {
    // Minta izin untuk mengakses galeri
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setTicketData({ ...ticketData, imageUrl: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text>{item.name}</Text>
                <Text>Rp. {item.price.toLocaleString()}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => openDialog(item)}>Edit</Button>
                <Button onPress={() => handleDeleteTicket(item.id)}>Delete</Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => openDialog()}
      />
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>{selectedTicket ? 'Edit Ticket' : 'Add Ticket'}</Dialog.Title>
          <Dialog.Content>
          <TextInput
              label="ID"
              value={ticketData.id}
              onChangeText={(text) => setTicketData({ ...ticketData, id: text })}
            />
            <TextInput
              label="Name"
              value={ticketData.name}
              onChangeText={(text) => setTicketData({ ...ticketData, name: text })}
            />
            <TextInput
              label="Price"
              value={ticketData.price}
              onChangeText={(text) => setTicketData({ ...ticketData, price: text })}
              keyboardType="numeric"
            />
            <TextInput
              label="Image URL"
              value={ticketData.imageUrl}
              onChangeText={(text) => setTicketData({ ...ticketData, imageUrl: text })}
              onFocus={handleSelectImage} // Memanggil fungsi pemilih gambar saat fokus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={selectedTicket ? handleUpdateTicket : handleAddTicket}>{selectedTicket ? 'Update' : 'Add'}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default TicketManagementScreen;