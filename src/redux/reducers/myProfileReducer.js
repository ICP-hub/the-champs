import { createSlice } from "@reduxjs/toolkit";

const initalProfileData = {
  currentTab: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initalProfileData,
  reducers: {
    getCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { getCurrentTab } = profileSlice.actions;

export default profileSlice.reducer;
