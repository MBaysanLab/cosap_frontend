import { axios } from "../lib/axios";

const getVariants = (projectID) => {
  return axios.get(`variants/${projectID}`);
};

export default getVariants;
