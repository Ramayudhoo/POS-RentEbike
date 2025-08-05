import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { loginUser, registerUser } from "../../utils/authService";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("user"); // Default role, bisa diubah sesuai kebutuhan

  const handleLogin = async () => {
    try {
      const { user, role } = await loginUser(email, password);
      if (user && role) {
        alert(`Login successful. Role: ${role}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser({ email, password, role });
      alert("User registered successfully");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {isRegister && (
          <>
            <Text style={styles.label}>Role</Text>
            <TextInput
              style={styles.input}
              value={role}
              onChangeText={setRole}
            />
          </>
        )}

        <View style={{ marginTop: 10 }}>
          <Button
            title={isRegister ? "Register" : "Login"}
            onPress={isRegister ? handleRegister : handleLogin}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title={`Switch to ${isRegister ? "Login" : "Register"}`}
            onPress={() => setIsRegister(!isRegister)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
  },
});

export default LoginScreen;
