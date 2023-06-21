import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTours } from '../api/tours';

const initialState = {
  toursList: [],
  status: null
};


export const getToursList = createAsyncThunk(
  'tours/fetchTours',
  async (data) => {
    console.log("here")
    const response = await fetchTours(data);
    console.log("here----", response)

    return response.data;
  }
);

export const tours = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    clearToursList: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.toursList = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToursList.pending, (state) => {
        console.log("loading")

        state.status = 'loading';
      })
      .addCase(getToursList.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log("item,data", action)
        state.toursList = action.payload;
      });
  },
});

export const { clearToursList } = tours.actions;

export const selectCountTours = (state) => state.tours.toursList;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default tours.reducer;
