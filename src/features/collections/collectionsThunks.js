import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCardToCollection,
  addCollectionTolist,
  deleteCardFromCollection,
  deleteCollectionFromList,
  getCollectionsByUserId,
  getPublicCollections,
  updateCardInCollection,
  updateCollectionFromList,
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
      const { userId, title, description, cards, visibility, creator, tags } =
        newCollectionData;

      const newCollection = await addCollectionTolist(
        userId,
        title,
        description,
        cards,
        visibility,
        creator,
        tags
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
      const deletedCollection = await deleteCollectionFromList(userId, colId);
      return deletedCollection; // tüm obje dönecek
    } catch (err) {
      console.error("Thunk | deleteCollection hatası:", err);
      return thunkAPI.rejectWithValue(
        err.message || "Koleksiyon silinirken hata oluştu."
      );
    }
  }
);

export const updateCollection = createAsyncThunk(
  "collections/updateCollection",
  async ({ userId, colId, values }, thunkAPI) => {
    try {
      const result = await updateCollectionFromList(userId, colId, values);
      return result;
    } catch (err) {
      console.error("Thunk | updateCollection hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchPublicCollections = createAsyncThunk(
  "collections/fetchPublicCollections",
  async (_, thunkAPI) => {
    try {
      const collections = await getPublicCollections();
      return collections;
    } catch (err) {
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

export const cardUpdate = createAsyncThunk(
  "collection/cardUpdate",
  async ({ userId, colId, cardId, values }, thunkAPI) => {
    try {
      const result = await updateCardInCollection(
        userId,
        colId,
        cardId,
        values
      );
      return result;
    } catch (err) {
      console.error("Thunk | cardUpdate hatası:", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
