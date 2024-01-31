import { createSlice } from "@reduxjs/toolkit";

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


export default industrySlice.reducer;
