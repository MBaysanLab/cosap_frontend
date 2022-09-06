import { axios } from "../lib/axios";

const getProjectDetail = (projectID) => {
  return axios.get(`project_stats/${projectID}`);
};

export default getProjectDetail;
