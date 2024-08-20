import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoader {
  loadMore: boolean;
  eventLoading: boolean;
  mapLoading: boolean;
  skeletonLoading: boolean;
}

const initialState: ILoader = {
  loadMore: false,
  eventLoading: false,
  mapLoading: false,
  skeletonLoading: false,
};

interface PayloadType {
  name: keyof ILoader;
  val: boolean;
}

const loaderReducer = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader(state, action: PayloadAction<PayloadType>) {
      const { name, val } = action.payload;
      state[name] = val;
    },
  },
});

export const { setLoader } = loaderReducer.actions;
export default loaderReducer.reducer;
