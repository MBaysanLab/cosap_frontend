import { axios } from "../lib/axios";

const getUserActions = () => {
  return axios.get("actions");
};

export default getUserActions;
