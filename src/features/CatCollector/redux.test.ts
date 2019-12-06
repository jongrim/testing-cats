import catCollectorSlice from "./redux";

const { reducer } = catCollectorSlice;

describe("catCollectorSlice", () => {
  test("it has collected and ignored cats", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).toEqual({ collectedCats: [], ignoredCats: [] });
  });

  test("it adds a cat to the collection", () => {
    const state = reducer(
      undefined,
      catCollectorSlice.actions.collectCat({
        cat: { breeds: [], height: 400, width: 400, id: "1", url: "test" }
      })
    );
    expect(state.collectedCats).toHaveLength(1);
    expect(state.ignoredCats).toHaveLength(0);
  });

  test("it adds a cat to the ignored list", () => {
    const state = reducer(
      undefined,
      catCollectorSlice.actions.ignoreCat({
        cat: { breeds: [], height: 400, width: 400, id: "1", url: "test" }
      })
    );
    expect(state.ignoredCats).toHaveLength(1);
    expect(state.collectedCats).toHaveLength(0);
  });
});
