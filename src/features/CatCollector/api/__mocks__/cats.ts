import breeds from "./breeds.json";
import categories from "./categories.json";

const cats = [
  {
    breeds: [],
    height: 100,
    width: 100,
    id: "test - 1",
    url: "#"
  }
];
const resp = { data: cats };
export const getCatImages = jest.fn().mockResolvedValue(resp);

export const catApi = jest.fn((endpoint: "/categories" | "/breeds") => {
  return new Promise(resolve => {
    const responses = {
      "/categories": categories,
      "/breeds": breeds
    };
    resolve(responses[endpoint]);
  });
});
