import { axios } from "../lib/axios";

const registerWithEmail = (registerData) => {
  return axios.post(`register/`, {
    first_name: registerData.first_name,
    last_name: registerData.last_name,
    email: registerData.email,
    password: registerData.password,
    is_guest: registerData.is_guest,
  });
};

export default registerWithEmail;
