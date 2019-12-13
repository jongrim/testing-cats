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

export interface QueryParams {
  breed_id?: string;
  category_id?: string;
}

interface GetCatImagesArgs {
  page: number;
  queryParams: QueryParams;
}
export const getCatImages = (
  { page, queryParams }: GetCatImagesArgs = { page: 0, queryParams: {} }
): Promise<CatImageResponse> => {
  return axios.get(`https://api.thecatapi.com/v1/images/search`, {
    headers: {
      "x-api-key": "06e74068-b14e-411e-8682-978b63c833ed"
    },
    params: {
      page,
      ...queryParams
    }
  });
};

export const catApi = (endpoint: string, params: object) => {
  return fetch(`https://api.thecatapi.com/v1${endpoint}`, params).then(resp =>
    resp.json()
  );
};
