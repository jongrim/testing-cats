import React from "react";
import useSWR from "swr";
import { catApi, QueryParams } from "./api/cats";
import { cleanSearch } from "./utils";

const params = {
  headers: {
    "x-api-key": "06e74068-b14e-411e-8682-978b63c833ed"
  }
};

interface Props {
  searchCats: (query: QueryParams) => void;
}

function CatCollectorSearch({ searchCats }: Props) {
  const [searchFormVisible, setSearchFormVisible] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const { data: categories = [] } = useSWR(["/categories", params], catApi);
  const { data: breeds = [] } = useSWR(["/breeds", params], catApi);
  return (
    <div>
      <button onClick={() => setSearchFormVisible(true)} className="my-2">
        Or search for your dream cat
      </button>
      <div className={`${searchFormVisible ? "visible" : "invisible"}`}>
        <form className="flex">
          <div className="flex flex-col">
            <label htmlFor="category-select">Category:</label>
            <select
              id="category-select"
              name="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((opt: { id: number; name: string }) => (
                <option value={opt.id} key={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="breed-select">Breed:</label>
            <select
              id="breed-select"
              name="breed"
              value={breed}
              onChange={e => setBreed(e.target.value)}
            >
              <option value="">Select a breed</option>
              {breeds.map((opt: { id: number; name: string }) => (
                <option value={opt.id} key={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => {
              const searchValues = {
                breed_id: breed,
                category_id: category
              };
              const result = cleanSearch(searchValues);
              searchCats(result as QueryParams);
            }}
          >
            FIND THAT CAT
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatCollectorSearch;
