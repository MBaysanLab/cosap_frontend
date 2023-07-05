import { axios } from "../lib/axios";

const getVariantReports = (payload) => {
  return axios.post("variant_reports/",
    payload, {responseType: 'blob'}
  )
  .then(response => {
    const url = URL.createObjectURL(response.data);
    console.log(url);
    const link = document.createElement('a');
    console.log(link);
    link.href = url;
    link.setAttribute('download', 'Report.pdf');
    link.click();
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
};


export default getVariantReports;