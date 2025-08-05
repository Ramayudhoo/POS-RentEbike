import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Ticket {
  id: string;
  name: string;
  price: number;
}

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

// Thunks for fetching, adding, updating, and deleting tickets
export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  // Simulate API call
  return new Promise<Ticket[]>((resolve) =>
    setTimeout(() => resolve([{ id: '1', name: 'Ticket A', price: 100 }]), 1000)
  );
});

export const addTicket = createAsyncThunk('tickets/addTicket', async (ticket: Ticket) => {
  // Simulate API call
  return ticket;
});

export const updateTicket = createAsyncThunk('tickets/updateTicket', async (ticket: Ticket) => {
  // Simulate API call
  return ticket;
});

export const deleteTicket = createAsyncThunk('tickets/deleteTicket', async (id: string) => {
  // Simulate API call
  return id;
});

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tickets';
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload);
      });
  },
});

export default ticketSlice.reducer;
