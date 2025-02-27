import axios from "axios";
import { API_URL } from "../config";
import storage from "../utils/storage";

export default function getSamples() {
  const token = storage.getToken();
  return axios.get(`${API_URL}samples/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}
