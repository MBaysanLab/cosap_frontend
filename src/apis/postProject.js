import { axios } from "../lib/axios";

const postProject = (projectData) => {
  return axios.post(`projects/`, projectData);
};

export default postProject;
