import { axios } from "../lib/axios";

export default function postResendVerification(email) {
  return axios.post(`auth/resend_verification/`, {
    email: email,
  });
}
