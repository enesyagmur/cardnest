import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import collectionReducer from "./features/collections/collectionsSlice";
import practiceReducer from "./features/practice/practiceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionReducer,
    practiceCollection: practiceReducer,
  },
});
