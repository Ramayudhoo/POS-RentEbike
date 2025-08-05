// redux/slices/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './antrianSlice';
import cartReducer from './cartSlice';
import antrianReducer from './antrianSlice';
import barcodeReducer from './barcodeSlice';
import transactionReducer from './transactionSlice'
import ticketReducer from './ticketSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  antrian: antrianReducer,
  barcode: barcodeReducer,
  transactions :transactionReducer,
  ticket: ticketReducer
  // tambahkan slice lain di sini
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
