import { axios } from "../lib/axios";

export default function postSample(fileIds) {
  return axios.post(`samples/`, fileIds);
}
