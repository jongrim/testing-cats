import React from "react";
import CatBadge from "./CatBadge";
import { render } from "@testing-library/react";

describe("CatBadge", () => {
  function getCatBadge(
    props = { url: "#", id: "test-1", breeds: [], height: 100, width: 100 }
  ) {
    return render(<CatBadge cat={props} />);
  }
  test("it renders an image", () => {
    const { getByAltText } = getCatBadge();
    expect(getByAltText("precious kitten - test-1")).toBeVisible();
  });
});
