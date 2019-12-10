import axios from "axios";
import { getCatImages } from "./cats";

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
