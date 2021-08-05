import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialGetDataState = { title: '1' };

const apiSlice = createSlice({
  name: 'getData',
  initialState: initialGetDataState,
  reducers: {
    fetchData(state, action) {
      console.log(action);
      state.title = action.payload; //fetchedData;
    },
  },
});

const store = configureStore({
  reducer: apiSlice.reducer,
});

export const apiActions = apiSlice.actions;

export default store;
