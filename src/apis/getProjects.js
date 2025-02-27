import { axios } from "../lib/axios";

const getProjects = () => {
  return axios.get(`projects/`);
};

export default getProjects;
