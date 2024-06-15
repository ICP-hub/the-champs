import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import collectionReducer from "../reducers/collectionReducer";
import nftReducer from "../reducers/nftReducer";
import myProfileReducer from "../reducers/myProfileReducer";
import walletReducer from "../reducers/walletReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionReducer,
    nftData: nftReducer,
    dfinityWallet: walletReducer,
    // profile: myProfileReducer,
  },
  // Middleware : disable serialize warning
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
