import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  col: {},
};
const practiceSlice = createSlice({
  name: "practiceCollection",
  initialState,
  reducers: {
    setCollectionForPractice: (state, action) => {
      state.col = action.payload;
    },
  },
});

export const { setCollectionForPractice } = practiceSlice.actions;
export default practiceSlice.reducer;
