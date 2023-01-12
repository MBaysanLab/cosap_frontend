import { axios } from "../lib/axios";

const getUser = () => {
  return axios.post(`get_user/`);
};

export default getUser;
