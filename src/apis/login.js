import { axios } from "../lib/axios";

const loginWithEmail = (logindata) => {
  return axios.post(`login/`, {
    username: logindata.email,
    password: logindata.password,
  });
};

export default loginWithEmail;
