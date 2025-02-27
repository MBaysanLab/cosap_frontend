import { axios } from "../lib/axios";

const postReRun = (projectId) => {
  return axios.post(`projects/${projectId}/rerun_project/`);
};

export default postReRun;
