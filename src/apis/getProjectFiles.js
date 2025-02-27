import { axios } from "../lib/axios";

const getProjectFiles = (projectID) => {
  return axios.get(`files/${projectID}?return_type=projectFileMap`);
};

export default getProjectFiles;
