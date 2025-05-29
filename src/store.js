import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import collectionReducer from "./features/collections/collectionsSlice";
import selectCardReducer from "./features/selectCardSlice";
import templatesReducer from "./features/templates/templatesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionReducer,
    selectCard: selectCardReducer,
    templates: templatesReducer,
  },
});
