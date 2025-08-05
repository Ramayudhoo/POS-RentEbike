import * as React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthProvider from '../provider/AuthProvider';
import { Slot } from 'expo-router';

const App = () => {
  console.log('app bekerja:', store);
  return (
    <Provider store={store}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </Provider>
  );
};

export default App;
