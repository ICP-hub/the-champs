import { createSlice } from "@reduxjs/toolkit";

const initialCollection = {
  canisterId: null,
  allCollections: null,
  featuredCollections: null,
  singleCollectionDetail: null,
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
    getSingleCollectionData: (state, action) => {
      state.singleCollectionDetail = action.payload;
    },
  },
});

export const { getAllCollectionData, getSingleCollectionData } =
  collectionSlice.actions;

export default collectionSlice.reducer;
