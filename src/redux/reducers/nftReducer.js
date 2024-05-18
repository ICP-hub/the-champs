import { createSlice } from "@reduxjs/toolkit";

const initialNFTData = {
  collectionIds: null,
  collectionCanisterText: null,
  collectionWiseNft: null,
  singleCollectionNFT: null,
};

const nftSlice = createSlice({
  name: "nftData",
  initialState: initialNFTData,
  reducers: {
    getCollectionIds: (state, action) => {
      state.collectionIds = action.payload;
    },
    getCollectionwiseNft: (state, action) => {
      state.collectionCanisterText = state.collectionIds.map((i) => i.toText());
      state.collectionWiseNft = action.payload;
    },
    getSingleCollectionNFT: (state, action) => {
      state.singleCollectionNFT = action.payload;
    },
  },
});

export const {
  getCollectionIds,
  getCollectionwiseNft,
  getSingleCollectionNFT,
} = nftSlice.actions;

export default nftSlice.reducer;
