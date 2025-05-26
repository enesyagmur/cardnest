import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  component: "collectionManager",
};
const selectComponentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setComponent: (state, action) => {
      state.component = action.payload;
    },
  },
});

export const { setComponent } = selectComponentSlice.actions;
export default selectComponentSlice.reducer;
