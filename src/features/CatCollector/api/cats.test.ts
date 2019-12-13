import axios from "axios";
import { getCatImages, catApi } from "./cats";

jest.mock("axios");
// @ts-ignore
axios.create.mockReturnValue(axios);
// @ts-ignore
axios.get.mockResolvedValue({});

describe("getCatImages service", () => {
  test("calls the endpoint", () => {
    getCatImages();
    expect(axios.get).toHaveBeenCalled();
  });
});

test("catApi calls the endpoint and passes parameters", () => {
  // @ts-ignore
  const spy = jest.spyOn(global, "fetch");
  catApi("/categories", { headers: { x: "foo" } });
  expect(spy).toHaveBeenCalled();
  expect(spy.mock.calls[0]).toEqual([
    "https://api.thecatapi.com/v1/categories",
    { headers: { x: "foo" } }
  ]);
});
