import axios from "axios";
import { CatImage } from "ts/Cat";

interface CatImageResponse {
  data: CatImage[];
  headers: {
    "pagination-count": string;
    "pagination-limit": string;
    "pagination-page": string;
  };
}

export const getCatImages = ({ page = 0 } = {}): Promise<CatImageResponse> => {
  return axios.get("https://api.thecatapi.com/v1/images/search", {
    headers: {
      "x-api-key": "06e74068-b14e-411e-8682-978b63c833ed"
    },
    params: {
      page
    }
  });
};
