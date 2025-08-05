import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AntrianState {
  sepeda: number;
  bogey: number;
}

const initialState: AntrianState = {
  sepeda: 0,
  bogey: 0,
};

const antrianSlice = createSlice({
  name: 'antrian',
  initialState,
  reducers: {
    updateSepeda(state, action: PayloadAction<number>) {
      state.sepeda = action.payload;
    },
    updateBogey(state, action: PayloadAction<number>) {
      state.bogey = action.payload;
    },
    resetAntrian(state) {
      state.sepeda = 0;
      state.bogey = 0;
    },
  },
});

export const { updateSepeda, updateBogey, resetAntrian } = antrianSlice.actions;
export default antrianSlice.reducer;