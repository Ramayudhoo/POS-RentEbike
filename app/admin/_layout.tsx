// app/_layout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Provider, Appbar } from 'react-native-paper';
import { useRouter, Link, Slot } from 'expo-router';
import Header from '~/components/Header';
import LogoutButton from '~/components/LogoutButton';

const AdminLayout: React.FC = () => {
  const router = useRouter();

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Admin Dashboard" />
      </Appbar.Header>
      <View style={styles.container}>
        <Drawer.Section title="Admin Dashboard">
          <Link href="/admin/tickets" asChild>
            <Drawer.CollapsedItem
              label="Manage Tickets"
              focusedIcon='ticket-confirmation-outline'
              onPress={() => router.push('/admin/tickets')}
            />
          </Link>
          <Link href="/admin/users" asChild>
            <Drawer.CollapsedItem
              label="Manage Users"
              focusedIcon="account-edit-outline"
              onPress={() => router.push('/admin/users')}
            />
          </Link>
        </Drawer.Section>
        <View style={styles.logoutContainer}>
          <LogoutButton />
        </View>
        <Slot />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  logoutContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default AdminLayout;