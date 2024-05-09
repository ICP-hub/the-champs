import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import collectionReducer from "../reducers/collectionReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionReducer,
  },
});
