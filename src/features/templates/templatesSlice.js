import { createSlice } from "@reduxjs/toolkit";
import {
  addTemplateThunk,
  deleteTemplateThunk,
  getTemplatesThunk,
} from "./templatesThunks";

const initialState = {
  templates: null,
  isLoading: false,
  error: null,
  selectedTemplate: null,
};

const templatesSlice = createSlice({
  name: "cardTemplates",
  initialState,
  reducers: {
    clearTemplates: (state) => {
      state.templates = null;
      state.selectedTemplate = null;
    },
    setTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getTemplatesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTemplatesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = action.payload;
      })
      .addCase(getTemplatesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

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
      })

      //delete
      .addCase(deleteTemplateThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTemplateThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = state.templates.filter(
          (template) => template.id !== action.payload
        );
      })
      .addCase(deleteTemplateThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Bilinmeyen Sorun";
      });
  },
});

export const { clearTemplates, setTemplate } = templatesSlice.actions;
export default templatesSlice.reducer;
