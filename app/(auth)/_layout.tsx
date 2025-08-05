import React from 'react';
import { Stack } from 'expo-router';

export default function authLayout() {
  return (
    <Stack>
      <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  );
}