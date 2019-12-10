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
