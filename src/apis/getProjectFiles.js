import { axios } from "../lib/axios";

const getProjectFiles = (projectID) => {
  return axios.get(`files/${projectID}`);
};

export default getProjectFiles;
