import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { combineReducers } from "redux";
import catCollectorSlice from "features/CatCollector/redux";

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

const rootReducer = combineReducers({
  catCollector: catCollectorSlice.reducer
});

export default configureStore({
  reducer: rootReducer
});
