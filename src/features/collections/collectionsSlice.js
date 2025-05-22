import { createSlice } from "@reduxjs/toolkit";
import {
  addCollection,
  deleteCollection,
  fetchCollections,
} from "./collectionsThunks";

const initialState = {
  collections: [],
  isLoading: false,
  error: null,
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchCollections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //add
      .addCase(addCollection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = [...state.collections, action.payload];
      })
      .addCase(addCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //delete
      .addCase(deleteCollection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = state.collections.filter(
          (col) => col.id !== action.payload
        );
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer } = collectionsSlice;
export default collectionsSlice.reducer;
