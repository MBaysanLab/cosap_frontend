import { axios } from "../lib/axios";

const getFiles = (query, type) => {
  return axios.get(`files/?${query}=${type}`);
};

export default getFiles;
