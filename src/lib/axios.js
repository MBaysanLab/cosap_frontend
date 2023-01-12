import Axios from "axios";
import { API_URL } from "../config";
import storage from "../utils/storage";

function authRequestInterceptor(config) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Token ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
