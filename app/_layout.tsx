startLine: 1;
endLine: 17;
import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthProvider from "~/provider/AuthProvider";

export default function Layout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}
