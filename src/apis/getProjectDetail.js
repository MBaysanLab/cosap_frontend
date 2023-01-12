import { axios } from "../lib/axios";

const getProjectDetail = (projectID) => {
  return axios.get(`project_details/${projectID}`);
};

export default getProjectDetail;
