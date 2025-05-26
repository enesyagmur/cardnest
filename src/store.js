import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import collectionReducer from "./features/collections/collectionsSlice";
import selectComponentReducer from "./features/selectComponentSlice";
import selectCardReducer from "./features/selectCardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionReducer,
    selectComponent: selectComponentReducer,
    selectCard: selectCardReducer,
  },
});
