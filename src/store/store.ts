import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import catCollectorSlice from "features/CatCollector/redux";

const rootReducer = combineReducers({
  catCollector: catCollectorSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer
});
