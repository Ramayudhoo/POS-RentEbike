import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import { updateSepeda, updateBogey, resetAntrian } from '../../redux/slices/antrianSlice';
import BackButton from '~/components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';


const AntrianScreen = () => {
  const dispatch = useDispatch();
  const antrian = useSelector((state: RootState) => state.antrian);

  return (
    <>
    <Provider store={store}>
      <SafeAreaView/>
    <View style={styles.container}>
    <BackButton title="Antrian" />
      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(updateSepeda(antrian.sepeda + 1))}>
          <Text style={styles.buttonText}>AMBIL ANTRIAN SEPEDA</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Antrian Berjalan Sepeda</Text>
        <Text style={styles.counter}>{antrian.sepeda}</Text>
        <TouchableOpacity style={styles.updateButton} onPress={() => dispatch(updateSepeda(antrian.sepeda))}>
          <Text style={styles.updateButtonText}>UPDATE ANTRIAN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(updateBogey(antrian.bogey + 1))}>
          <Text style={styles.buttonText}>AMBIL ANTRIAN BOGEY</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Antrian Berjalan Bogey</Text>
        <Text style={styles.counter}>{antrian.bogey}</Text>
        <TouchableOpacity style={styles.updateButton} onPress={() => dispatch(updateBogey(antrian.bogey))}>
          <Text style={styles.updateButtonText}>UPDATE ANTRIAN</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={() => dispatch(resetAntrian())}>
        <Text style={styles.resetButtonText}>RESET ANTRIAN</Text>
      </TouchableOpacity>
    </View>
</Provider>
</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  counter: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AntrianScreen;