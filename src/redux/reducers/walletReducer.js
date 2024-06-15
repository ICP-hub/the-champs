import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const walletState = {
  Idle: "Idle",
  OpenWalletList: "OpenWalletList",
  Disconnected: "Disconnected",
  Loading: "Loading",
  Connecting: "Connecting",
  Connected: "Connected",
};

const initialState = {
  principalId: undefined,
  accountId: undefined,
  state: walletState.Idle,
  isConnected: false,
  walletConnected: undefined,
  walletSelected: undefined,
};

export const walletSlice = createSlice({
  name: "dfinityWallet",
  initialState,
  reducers: {
    resetWallet: (state) => {
      state.principalId = undefined;
      state.accountId = undefined;
      state.state = walletState.Idle;
      state.isConnected = false;
      state.walletConnected = undefined;
      state.walletSelected = undefined;
    },
    setWalletLoaded: (state, action) => {
      const { principleId, accountId, walletActive } = action.payload;
      if (!principleId || !accountId) return;
      state.principalId = principleId;
      state.accountId = accountId;
      state.isConnected = true;
      state.walletConnected = walletActive;
      state.state = walletState.Connected;
    },
    setState: (state, action) => {
      state.state = action.payload;
      state.principalId = undefined;
      state.isConnected = false;
    },
    setOnwalletList: (state, action) => {
      state.state = action.payload;
    },
    setWalletSelected: (state, action) => {
      state.walletSelected = action.payload;
    },
  },
});

export const walletActions = { ...walletSlice.actions };

const selectWalletState = (state) => state.dfinityWallet;

export const useWalletStore = () => useSelector(selectWalletState);

export default walletSlice.reducer;
