import catCollectorSlice, { favoriteCat } from "./redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const { actions, reducer } = catCollectorSlice;
const { collectCat, favoriteCatFailed } = actions;

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe("catCollectorSlice", () => {
  test("it has collected and ignored cats", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).toEqual({ collectedCats: [], ignoredCats: [], error: "" });
  });

  test("it adds a cat to the collection", () => {
    const state = reducer(
      undefined,
      catCollectorSlice.actions.collectCat({
        breeds: [],
        height: 400,
        width: 400,
        id: "1",
        url: "test"
      })
    );
    expect(state.collectedCats).toHaveLength(1);
    expect(state.ignoredCats).toHaveLength(0);
  });

  test("it adds a cat to the ignored list", () => {
    const state = reducer(
      undefined,
      catCollectorSlice.actions.ignoreCat({
        breeds: [],
        height: 400,
        width: 400,
        id: "1",
        url: "test"
      })
    );
    expect(state.ignoredCats).toHaveLength(1);
    expect(state.collectedCats).toHaveLength(0);
  });

  test("it sets the error is favoriting a cat fails", () => {
    const state = reducer(
      undefined,
      catCollectorSlice.actions.favoriteCatFailed("Cannot favorite cat")
    );
    expect(state.error).toBe("Cannot favorite cat");
  });

  test("favoriteCat thunk", () => {
    const testCat = {
      breeds: [],
      height: 400,
      width: 400,
      id: "1",
      url: "test"
    };
    const store = mockStore(reducer(undefined, { type: "" }));
    // @ts-ignore
    return store.dispatch(favoriteCat(testCat)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(collectCat(testCat));
    });
  });

  test("favoriteCat thunk error", () => {
    const testCat = {
      breeds: [],
      height: 400,
      width: 400,
      id: "1",
      url: "test"
    };
    const store = mockStore(reducer(undefined, { type: "" }));
    // @ts-ignore
    return store.dispatch(favoriteCat(testCat)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(
        favoriteCatFailed("Cat is already in favorites")
      );
    });
  });
});
