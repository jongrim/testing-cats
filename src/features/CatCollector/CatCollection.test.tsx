import React from "react";
import { render } from "@testing-library/react";
import CatCollection from "./CatCollection";

const cats = Array.from([1, 2, 3, 4, 5], x => ({
  breeds: [],
  url: "",
  id: `${x}`,
  width: 100,
  height: 100
}));

test("CatCollection creates a list of cat badges", () => {
  const { getByAltText } = render(
    <CatCollection cats={cats}>My super cool collection</CatCollection>
  );
  expect(getByAltText("precious kitten - 3")).toBeInTheDocument();
});
