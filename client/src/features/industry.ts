import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  industryList: [],
};

export const industrySlice = createSlice({
  name: "industry",
  initialState,
  reducers: {
    getIndustry: (state, payload) => {
      console.log(state, payload);
    },
  },
});

export const { getIndustry } = industrySlice.actions;

export const selectCount = (state: RootState) => state.login;


export default industrySlice.reducer;
