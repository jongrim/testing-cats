// import "./api/__mocks__/cats";
import React from "react";
import CatCollector from "./CatCollector";
import { Provider } from "react-redux";
import store from "store";
import { render, fireEvent, waitForElement } from "@testing-library/react";

jest.mock("./api/cats");

describe("CatCollector", () => {
  function getCatCollector() {
    return render(
      <Provider store={store}>
        <CatCollector />
      </Provider>
    );
  }

  test("it shows the cat", async () => {
    const { getByAltText } = getCatCollector();
    const mainCatImg = await waitForElement(() =>
      getByAltText("cat - probably adorable")
    );
    expect(mainCatImg).toBeVisible();
  });

  test("it has a button to collect the cat", async () => {
    const { findByText, getByText } = getCatCollector();
    const purrrfectButton = await waitForElement(() => getByText("Purrrfect"));
    expect(purrrfectButton).toBeVisible();
    fireEvent.click(purrrfectButton);
    // you can also use findBy* which is a combination of waitFor and getBy
    const loading = await findByText("Loading");
    expect(loading).toBeVisible();
  });

  test("it has a button to ignore the cat", async () => {
    const { getByText } = getCatCollector();
    const ignoreButton = await waitForElement(() => getByText("Get Another"));
    fireEvent.click(ignoreButton);
    const loading = await waitForElement(() => getByText("Loading"));
    expect(loading).toBeVisible();
  });
});
