import React from "react";
import CatCollector from "./CatCollector";
import { Provider } from "react-redux";
import store from "store";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  test("it has a form to search for specific kinds of cats", async () => {
    const { findByText, findByLabelText, getByTestId } = getCatCollector();
    const showSearchFormButton = await findByText(
      "Or search for your dream cat"
    );
    fireEvent.click(showSearchFormButton);

    // simulate user selection of category
    const categorySelection = await findByLabelText("Category:");
    userEvent.selectOptions(categorySelection, "5");
    // @ts-ignore
    expect(getByTestId("5").selected).toBe(true);

    // simulate user selection of breed
    const breedSelection = await findByLabelText("Breed:");
    userEvent.selectOptions(breedSelection, "awir");
    // @ts-ignore
    expect(getByTestId("awir").selected).toBe(true);

    // simulate form submission
    const searchButton = await findByText("FIND THAT CAT");
    fireEvent.click(searchButton);
    const loading = await findByText("Loading");
    expect(loading).toBeVisible();
  });
});
