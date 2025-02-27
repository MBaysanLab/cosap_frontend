import axios from "axios";
import { API_URL } from "../config";
import storage from "../utils/storage";

export default function postSample(formData) {
  const token = storage.getToken();
  return axios.post(`${API_URL}samples/`, formData, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}
