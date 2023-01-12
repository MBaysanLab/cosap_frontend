import { axios } from "../lib/axios";

export const controller = new AbortController();
export let uploadProgressEvent = new Event("init");
const postFile = (data) => {
  return axios.post(`files/`, data, {
    signal: controller.signal,
    onUploadProgress: (e) => {
      uploadProgressEvent = e;
    },
  });
};

export default postFile;
