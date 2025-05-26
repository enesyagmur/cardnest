import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  col: {},
};
const selectCollectionSlice = createSlice({
  name: "selectCollection",
  initialState,
  reducers: {
    setCollection: (state, action) => {
      state.col = action.payload;
    },
  },
});

export const { setCollection } = selectCollectionSlice.actions;
export default selectCollectionSlice.reducer;
