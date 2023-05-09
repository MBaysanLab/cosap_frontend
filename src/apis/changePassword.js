import { axios } from "../lib/axios";

const ChangePassword = (data) => {
  return axios.put(`change_password/`, {
    old_password: data.old_password,
    new_password: data.new_password,
  });
};

export default ChangePassword;
