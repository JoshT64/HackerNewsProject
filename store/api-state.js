import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialGetDataState = { data: '', isLoading: false };

const apiSlice = createSlice({
  name: 'getData',
  initialState: initialGetDataState,
  reducers: {
    fetchData(state, action) {
      state.data = action.payload; //fetchedData;
    },
    loading(state, action) {
      state.loading = action.payload;
    },
    dataFailed(state) {
      state.data =
        'Your requested data has failed to load, please contact the developer.';
    },
  },
});

const store = configureStore({
  reducer: apiSlice.reducer,
});

export const apiActions = apiSlice.actions;

export default store;
