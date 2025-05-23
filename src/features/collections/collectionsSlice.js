import { createSlice } from "@reduxjs/toolkit";
import {
  addCollection,
  addnewCard,
  cardDelete,
  cardUpdate,
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
      //fetch collections
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

      //add collection
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

      //collection delete
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
      })

      //add card
      .addCase(addnewCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addnewCard.fulfilled, (state, action) => {
        state.isLoading = false;
        const { colId, card } = action.payload;

        const colIndex = state.collections.findIndex((col) => col.id === colId);
        if (colIndex !== -1) {
          state.collections[colIndex].cards.push(card);
        }
      })
      .addCase(addnewCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //delete card
      .addCase(cardDelete.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(cardDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        const { colId, cardId } = action.payload;
        const colIndex = state.collections.findIndex((col) => col.id === colId);
        if (colIndex !== -1) {
          const updatedCards = state.collections[colIndex].cards.filter(
            (card) => card.id !== cardId
          );
          state.collections[colIndex].cards = updatedCards;
        }
      })
      .addCase(cardDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //updateCard
      .addCase(cardUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cardUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        const { colId, cardId, updatedTime, values } = action.payload;

        const colIndex = state.collections.findIndex((col) => col.id === colId);
        if (colIndex !== -1) {
          const collection = state.collections[colIndex];

          const cardIndex = collection.cards.findIndex(
            (card) => card.id === cardId
          );
          if (cardIndex !== -1) {
            const updatedCard = {
              ...collection.cards[cardIndex],
              ...values,
              updatedAt: updatedTime,
            };

            const updatedCards = [...collection.cards];
            updatedCards[cardIndex] = updatedCard;

            const updatedCollection = {
              ...collection,
              cards: updatedCards,
            };

            state.collections[colIndex] = updatedCollection;
          }
        }
      })
      .addCase(cardUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer } = collectionsSlice;
export default collectionsSlice.reducer;
