import { axios } from "../lib/axios";

const getVariants = () => {
  return axios.get(`variants/`);
};

export default getVariants;
