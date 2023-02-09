import { axios } from "../lib/axios";

const getProjectDetail = (projectID) => {
  return axios.get(`projects/${projectID}`);
};

export default getProjectDetail;
