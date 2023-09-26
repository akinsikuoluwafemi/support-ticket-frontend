import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { ITicket } from '../types/globalTypes';

const base_url = 'http://localhost:4000';

interface TicketDataState {
  allTicket: ITicket[];
  loading: boolean;
  error: any;
}

const initialState: TicketDataState = {
  allTicket: [],
  loading: false,
  error: null,
};

// action to get alltickets
export const getAllTicket = createAsyncThunk(
  'ticketData/getAllTicket',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${base_url}/tickets/`);
      return data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  },
);

// action to create a ticket
export const createTicket = createAsyncThunk(
  'ticketData/createTicket',
  async (ticket: { client: string; issue: string; date: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${base_url}/tickets/`, {
        client: ticket.client,
        issue: ticket.issue,
        deadline: ticket.date,
      });
      return data;
    } catch (err: any) {
      console.log(err);
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  },
);

// action to edit a ticket, (change the status)
export const editTicket = createAsyncThunk(
  'ticketData/editTicket',
  async (
    ticket: {
      client: string;
      issue: string;
      deadline: string;
      status: string;
      _id: string;
    },
    thunkAPI,
  ) => {
    try {
      const { data } = await axios.put(`${base_url}/tickets/${ticket._id}`, {
        client: ticket.client,
        issue: ticket.issue,
        deadline: ticket.deadline,
        status: ticket.status,
      });
      return data;
    } catch (err: any) {
      console.log(err);
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  },
);

const ticketDataSlice = createSlice({
  name: 'ticketData',
  initialState,
  reducers: {
    setTicketError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTicketLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.allTicket = action.payload;
      state.error = null;
    });
    builder.addCase(getAllTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllTicket.pending, (state, action) => {
      state.loading = true;
    });

    // come back here
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createTicket.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      // state.allTicket
    });
    builder.addCase(editTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(editTicket.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { setTicketError, setTicketLoading } = ticketDataSlice.actions;

export const selectTicketLoading = (state: RootState) =>
  state.ticketData.loading;

export const selectAllTickets = (state: RootState) =>
  state.ticketData.allTicket;

export default ticketDataSlice.reducer;
