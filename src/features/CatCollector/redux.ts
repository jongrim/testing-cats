import { createSlice } from "@reduxjs/toolkit";
import { CatImage } from "ts/Cat";

interface CatCollectorAction {
  payload: { cat: CatImage };
}

interface CatCollectorState {
  collectedCats: CatImage[];
  ignoredCats: CatImage[];
}

export const initialState: CatCollectorState = {
  collectedCats: [],
  ignoredCats: []
};

const catCollectorSlice = createSlice({
  name: "catCollecter",
  initialState,
  reducers: {
    collectCat: (state, action: CatCollectorAction) => ({
      ...state,
      collectedCats: state.collectedCats.concat(action.payload.cat)
    }),
    ignoreCat: (state, action: CatCollectorAction) => ({
      ...state,
      ignoredCats: state.ignoredCats.concat(action.payload.cat)
    })
  }
});

export default catCollectorSlice;
