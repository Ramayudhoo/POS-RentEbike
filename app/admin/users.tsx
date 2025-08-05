import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button, ActivityIndicator, FAB, Dialog, Portal, TextInput } from 'react-native-paper';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '~/utils/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserManagementScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userData, setUserData] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersCollection = await getDocs(collection(db, 'users'));
      const userList = usersCollection.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        role: doc.data().role,
      }));
      setUsers(userList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users: ", error);
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      await addDoc(collection(db, 'users'), userData);
      fetchUsers();
      setDialogVisible(false);
      setUserData({ name: '', email: '', role: '' });
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      try {
        const userRef = doc(db, 'users', selectedUser.id);
        await updateDoc(userRef, userData);
        fetchUsers();
        setDialogVisible(false);
        setUserData({ name: '', email: '', role: '' });
        setSelectedUser(null);
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const openDialog = (user: User | null = null) => {
    setSelectedUser(user);
    setUserData(user ? { name: user.name, email: user.email, role: user.role } : { name: '', email: '', role: '' });
    setDialogVisible(true);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.userName}>{item.name}</Text>
                <Text>{item.email}</Text>
                <Text>{item.role}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => openDialog(item)}>Edit</Button>
                <Button onPress={() => handleDeleteUser(item.id)}>Delete</Button>
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
          <Dialog.Title>{selectedUser ? 'Edit User' : 'Add User'}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Name"
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
            <TextInput
              label="Email"
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
              keyboardType="email-address"
            />
            <TextInput
              label="Role"
              value={userData.role}
              onChangeText={(text) => setUserData({ ...userData, role: text })}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={selectedUser ? handleUpdateUser : handleAddUser}>{selectedUser ? 'Update' : 'Add'}</Button>
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
  userName: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default UserManagementScreen;