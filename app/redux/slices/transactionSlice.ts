// transactionSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '~/utils/firebase'; // Sesuaikan path import dengan file firebase.ts
import { collection, getDocs } from 'firebase/firestore';

interface ItemDetail {
  name: string;
}

interface Transaction {
  id: string;
  invoiceId: string;
  date: string;
  name: string;
  amount: number;
  paymentmethod: string;
  transaction_status: string;
  payment_type: string;
  item_details: ItemDetail[];
}

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
  const querySnapshot = await getDocs(collection(db, 'transactions'));
  const transactions: Transaction[] = [];
  querySnapshot.forEach((doc) => {
    transactions.push({ id: doc.id, ...doc.data(), item_details: doc.data().item_details || [] } as Transaction);
  });
  return transactions;
});

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default transactionSlice.reducer;