import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import collectionReducer from "../reducers/collectionReducer";
import nftReducer from "../reducers/nftReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionReducer,
    nftData: nftReducer,
  },
  // Middleware : disable serialize warning
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
