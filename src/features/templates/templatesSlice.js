import { createSlice } from "@reduxjs/toolkit";
import { addTemplateThunk } from "./templatesThunks";

const initialState = {
  templates: [],
  isLoading: false,
  error: null,
};

const templatesSlice = createSlice({
  name: "cardTemplates",
  initialState,
  reducers: {
    clearTemplates: (state) => {
      state.templates = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTemplateThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTemplateThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates.push(action.pending);
      })
      .addCase(addTemplateThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Bilinmeyen Sorun";
      });
  },
});

export const { clearTemplates } = templatesSlice.actions;
export default templatesSlice.reducer;
