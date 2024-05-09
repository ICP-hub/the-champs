import { createSlice } from "@reduxjs/toolkit";

const initialCollection = {
  canisterId: null,
  allCollections: null,
  featuredCollections: null,
};

const collectionSlice = createSlice({
  name: "collections",
  initialState: initialCollection,
  reducers: {
    getAllCollectionData: (state, action) => {
      state.canisterId = action.payload.canisterId;
      state.allCollections = action.payload.allCollections;
      state.featuredCollections = action.payload.featuredCollections;
    },
  },
});

export const { getAllCollectionData } = collectionSlice.actions;

export default collectionSlice.reducer;
