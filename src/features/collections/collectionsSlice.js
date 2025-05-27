import { createSlice } from "@reduxjs/toolkit";
import {
  addCollection,
  addnewCard,
  addPublicCollection,
  cardDelete,
  cardUpdate,
  deleteCollection,
  fetchCollections,
  fetchPublicCollections,
  updateCollection,
} from "./collectionsThunks";

const initialState = {
  publicCollections: [],
  collections: [],
  isLoading: false,
  error: null,
  selectedCollectionId: "",
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollectionId: (state, action) => {
      state.selectedCollectionId = action.payload;
    },
    clearCollections: (state) => {
      state.collections = [];
    },
  },
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
      // add collection
      .addCase(addCollection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = [...state.collections, action.payload];

        if (action.payload.visibility === "public") {
          state.publicCollections = [
            ...state.publicCollections,
            action.payload,
          ];
        }
      })
      .addCase(addCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //collectionUpdate
      .addCase(updateCollection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        const { userId, colId, values } = action.payload;

        const userColIndex = state.collections.findIndex(
          (col) => col.id === colId
        );
        if (userColIndex !== -1) {
          const currentCol = state.collections[userColIndex];
          const updatedCol = { ...currentCol, ...values };
          state.collections[userColIndex] = updatedCol;

          if (updatedCol.visibility === "public") {
            const globalColIndex = state.publicCollections.findIndex(
              (col) => col.id === colId && col.userId === userId
            );
            if (globalColIndex !== -1) {
              state.publicCollections[globalColIndex] = updatedCol;
            }
          }
        }
      })
      .addCase(updateCollection.rejected, (state, action) => {
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

        const deletedCol = action.payload;

        state.collections = state.collections.filter(
          (col) => col.id !== deletedCol.id
        );

        // Eğer visibility public ise publicCollections listesinden de çıkar
        if (deletedCol.visibility === "public") {
          state.publicCollections = state.publicCollections.filter(
            (col) => col.id !== deletedCol.id
          );
        }
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // fetch Public koleksiyonlar
      .addCase(fetchPublicCollections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicCollections = action.payload;
      })
      .addCase(fetchPublicCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // create Public Collection
      .addCase(addPublicCollection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPublicCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = [...state.collections, action.payload];
      })
      .addCase(addPublicCollection.rejected, (state, action) => {
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
        if (state.collections[colIndex].visibility === "public") {
          const publicColIndex = state.publicCollections.findIndex(
            (col) => col.id === colId
          );
          if (publicColIndex != -1) {
            state.publicCollections[publicColIndex].cards = [
              ...state.publicCollections[publicColIndex].cards,
              card,
            ];
          }
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
        const { colId, cardId, updatedCard, visibility } = action.payload;

        // ÖZEL KOLEKSİYON GÜNCELLEME
        const colIndex = state.collections.findIndex((col) => col.id === colId);
        if (colIndex !== -1) {
          const collection = state.collections[colIndex];

          const cardIndex = collection.cards.findIndex(
            (card) => card.id === cardId
          );
          if (cardIndex !== -1) {
            const updatedCards = [...collection.cards];
            updatedCards[cardIndex] = {
              ...collection.cards[cardIndex],
              ...updatedCard,
            };

            state.collections[colIndex] = {
              ...collection,
              cards: updatedCards,
            };
          }
        }

        if (visibility === "public") {
          const publicIndex = state.publicCollections.findIndex(
            (col) => col.id === colId
          );
          if (publicIndex !== -1) {
            const publicCollection = state.publicCollections[publicIndex];

            const publicCardIndex = publicCollection.cards.findIndex(
              (card) => card.id === cardId
            );

            if (publicCardIndex !== -1) {
              const updatedPublicCards = [...publicCollection.cards];
              updatedPublicCards[publicCardIndex] = {
                ...publicCollection.cards[publicCardIndex],
                ...updatedCard,
              };

              state.publicCollections[publicIndex] = {
                ...publicCollection,
                cards: updatedPublicCards,
              };
            }
          }
        }
      })
      .addCase(cardUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCollectionId, clearCollections } = collectionsSlice.actions;
export default collectionsSlice.reducer;
