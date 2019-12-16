import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as R from "ramda";
import { AppThunk } from "store/store";
import { CatImage } from "ts/Cat";

interface CatCollectorState {
  collectedCats: CatImage[];
  ignoredCats: CatImage[];
  error?: string;
}

export const initialState: CatCollectorState = {
  collectedCats: getFavorites(),
  ignoredCats: [],
  error: ""
};

const catCollectorSlice = createSlice({
  name: "catCollecter",
  initialState,
  reducers: {
    collectCat: (
      state,
      action: PayloadAction<CatImage>
    ): CatCollectorState => ({
      ...state,
      collectedCats: state.collectedCats.concat(action.payload)
    }),
    ignoreCat: (state, action: PayloadAction<CatImage>): CatCollectorState => ({
      ...state,
      ignoredCats: state.ignoredCats.concat(action.payload)
    }),
    favoriteCatFailed: (
      state,
      action: PayloadAction<string>
    ): CatCollectorState => ({
      ...state,
      error: action.payload
    })
  }
});

const { collectCat, favoriteCatFailed } = catCollectorSlice.actions;

export const favoriteCat = (cat: CatImage): AppThunk => dispatch => {
  return fakeFavoriteAPI(cat).then(
    () => {
      dispatch(collectCat(cat));
    },
    (e: Error) => {
      dispatch(favoriteCatFailed(e.message));
    }
  );
};

function fakeFavoriteAPI(cat: CatImage) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const favorites = getFavorites();
      R.ifElse(
        catCanBeFavorited(favorites),
        (cat: CatImage) => savetoLocalStorage(cat, favorites),
        (): void => {
          reject(new Error("Cat is already in favorites"));
        }
      )(cat);
      resolve();
    }, 0);
  });
}

function getFavorites(): CatImage[] {
  return JSON.parse(localStorage.getItem("favoriteCats") || "[]");
}
function savetoLocalStorage(cat: CatImage, favorites: CatImage[]) {
  localStorage.setItem("favoriteCats", JSON.stringify(favorites.concat(cat)));
}
function catCanBeFavorited(favorites: CatImage[]): (x: CatImage) => boolean {
  return function f(cat: CatImage) {
    return R.not(favorites.some(favorite => favorite.id === cat.id));
  };
}

export default catCollectorSlice;
