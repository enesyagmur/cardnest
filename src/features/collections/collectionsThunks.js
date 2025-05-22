import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCollectionTolist,
  deleteCollectionFromList,
  getCollectionsByUserId,
} from "./collectionsServices";

export const fetchCollections = createAsyncThunk(
  "collections/fetchCollections",
  async (userId, thunkAPI) => {
    try {
      const collections = await getCollectionsByUserId(userId);
      return collections;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addCollection = createAsyncThunk(
  "collections/addCollection",
  async (newCollectionData, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.uid;
      const { title, description, cards } = newCollectionData;
      const newCollection = await addCollectionTolist(
        userId,
        title,
        description,
        cards
      );
      return newCollection;
    } catch (err) {
      console.error("addNewCollection thunk hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "collections/deleteCollection",
  async (idies, thunkAPI) => {
    try {
      const idList = { userId: idies.userId, colId: idies.colId };
      const deleteCollectionId = await deleteCollectionFromList(
        idList.userId,
        idList.colId
      );
      return deleteCollectionId;
    } catch (err) {
      console.error("deleteCollection thunk hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
