import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  card: {},
};
const selectCardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCard: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const { setCard } = selectCardSlice.actions;
export default selectCardSlice.reducer;
