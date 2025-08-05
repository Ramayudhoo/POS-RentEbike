import * as React from "react";
import { ScrollView, StyleSheet, View, SafeAreaView } from "react-native";
import CardComponent from "../../../components/CardComponent";
import Header from "../../../components/Header";
import colors from "../../../constants/color";

const HomeScreen = () => {
  const handlePress = (message: string) => {
    console.log(message);
  };

  return (
    <>
      <Header/>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <CardComponent
            title="Antrian"
            icon="account-group"
            onPress={() => handlePress("Antrian Button Pressed")}
            href="Antrian/AntrianScreen"
            style={[styles.card, { height: 150 }]}
          />
          <CardComponent
            title="Ticket"
            icon="ticket"
            onPress={() => handlePress("Ticket Button Pressed")}
            href="Ticket/TicketScreen"
            style={[styles.card, { height: 150 }]}
          />
        </View>
        <View style={styles.row}>
          <CardComponent
            title="Scan Barcode"
            icon="barcode-scan"
            onPress={() => handlePress("Scan Barcode Button Pressed")}
            href="Barcode/ScanBarcodeScreen"
            style={[styles.card, { height: 150 }]}
          />
        </View>
        <View style={styles.row}>
          <CardComponent
            title="Transaksi"
            icon="folder"
            onPress={() => handlePress("DaftarTransaksi Button Pressed")}
            href="transaction/TransaksiScreen"
            style={[styles.card, { height: 150 }]}
          />
          <CardComponent
            title="Settings"
            icon="cog"
            onPress={() => handlePress("Settings Button Pressed")}
            href="Setting/SettingScreen"
            style={[styles.card, { height: 150 }]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
</>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding:10,
  },
  container: {
    padding: 20,
    marginTop: 70,
    flexGrow: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.cardBackground,
  },
});

export default HomeScreen;