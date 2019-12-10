import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./features/CatCollector/api/cats");

describe("App", () => {
  test("renders cat collection", async () => {
    const { findByText } = render(<App />);
    const collectedCats = await findByText("Your Kitty Collection");
    expect(collectedCats).toBeVisible();
  });

  test("renders ignored collection", async () => {
    const { findByText } = render(<App />);
    const ignoredCats = await findByText("Still in the running");
    expect(ignoredCats).toBeVisible();
  });

  test("renders the main cat image", async () => {
    const { findByAltText } = render(<App />);
    const mainCatImg = await findByAltText("cat - probably adorable");
    expect(mainCatImg).toBeVisible();
  });
});
