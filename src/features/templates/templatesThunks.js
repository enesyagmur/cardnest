import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTemplate } from "./templatesService";

export const addTemplateThunk = createAsyncThunk(
  "templates/addTemplate",
  async ({ userId, template }, thunkAPI) => {
    try {
      const newTemplate = await addTemplate(userId, template);
      return newTemplate;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Thunk | Template eklenirken bilinmeyen bir hata oluştu"
      );
    }
  }
);
