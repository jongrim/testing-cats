import axios from "axios";
import { CatImage } from "ts/Cat";

const cats = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: {
    "x-api-key": "06e74068-b14e-411e-8682-978b63c833ed"
  }
});

interface CatImageResponse {
  data: CatImage[];
  headers: {
    "pagination-count": string;
    "pagination-limit": string;
    "pagination-page": string;
  };
}

export const getCatImages = ({ page = 0 } = {}): Promise<CatImageResponse> => {
  return cats.get("/images/search", {
    params: {
      page
    }
  });
};
