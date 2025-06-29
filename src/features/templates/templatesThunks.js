import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTemplate, deleteTemplate, getTemplates } from "./templatesService";

export const getTemplatesThunk = createAsyncThunk(
  "templates/getTemplates",
  async (userId, thunkAPI) => {
    try {
      const templates = await getTemplates(userId);
      return templates;
    } catch (err) {
      thunkAPI.rejectWithValue(
        err.message || "Thunk | Templates alınırken bilinmeyen bir hata oluştu"
      );
    }
  }
);

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

export const deleteTemplateThunk = createAsyncThunk(
  "templates/deleteTemplate",
  async ({ userId, templateId }, thunkAPI) => {
    try {
      await deleteTemplate(userId, templateId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
