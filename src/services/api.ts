import axios from "axios";
import { ApiResponseType } from "../components/App/types";

axios.defaults.baseURL = "https://api.unsplash.com/search";
const API_KEY = "vbrwsheIr5-Me-cqCbtmtVPDVb0qTBVGN40WfGoHfxI";

export const fetchImagesByQuery = async <ApiResponseType>(
  currentPage: number,
  per_page: number,
  searchQuery: string
): Promise<ApiResponseType> => {
  const response = await axios.get<ApiResponseType>(
    `/photos?client_id=${API_KEY}&page=${currentPage}&per_page=${per_page}&query=${searchQuery}`
  );

  return response.data;
};
