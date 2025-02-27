import { axios } from "../lib/axios";

const postDeleteProject = (projectId) => {
  return axios.post(`projects/${projectId}/delete_project/`);
};

export default postDeleteProject;
