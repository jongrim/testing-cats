import { cleanSearch } from "./utils";

test("cleanSearch removes breed_id or category_id if an empty string", () => {
  expect(cleanSearch({ breed_id: "", category_id: "something" })).toEqual({
    category_id: "something"
  });
  expect(cleanSearch({ breed_id: "", category_id: "" })).toEqual({});
  expect(cleanSearch({ breed_id: "other thing", category_id: "" })).toEqual({
    breed_id: "other thing"
  });
});
