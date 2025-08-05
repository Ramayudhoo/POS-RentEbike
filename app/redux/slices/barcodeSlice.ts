import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BarcodeState {
  barcodeData: string;
}

const initialState: BarcodeState = {
  barcodeData: '',
};

const barcodeSlice = createSlice({
  name: 'barcode',
  initialState,
  reducers: {
    setBarcodeData(state, action: PayloadAction<string>) {
      state.barcodeData = action.payload;
    },
    clearBarcodeData(state) {
      state.barcodeData = '';
    },
  },
});

export const { setBarcodeData, clearBarcodeData } = barcodeSlice.actions;
export default barcodeSlice.reducer;
