import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCardToCollection,
  addCollectionTolist,
  deleteCardFromCollection,
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
      console.error("Thunk | addNewCollection hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "collections/deleteCollection",
  async ({ userId, colId }, thunkAPI) => {
    try {
      const deleteCollectionId = await deleteCollectionFromList(userId, colId);
      return deleteCollectionId;
    } catch (err) {
      console.error("Thunk | deleteCollection hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addnewCard = createAsyncThunk(
  "collection/addNewCard",
  async ({ userId, colId, newCardData }, thunkAPI) => {
    try {
      const result = await addCardToCollection(userId, colId, newCardData);

      return result;
    } catch (err) {
      console.error("Thunk | addNewCard  hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const cardDelete = createAsyncThunk(
  "collection/cardDelete",
  async ({ userId, colId, cardId }, thunkAPI) => {
    try {
      const result = await deleteCardFromCollection(userId, colId, cardId);
      return result;
    } catch (err) {
      console.error("Thunk | deleteCard hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
