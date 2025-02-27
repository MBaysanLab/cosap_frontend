import axios from "axios";
import { API_URL } from "../config";
import storage from "../utils/storage";

export default function getSampleDetail(sampleId) {
  const token = storage.getToken();
  return axios.get(`${API_URL}samples/${sampleId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}
