import { axios } from "../lib/axios";

const getVariantDetail = (variantId) => {
  return axios.get(`variants_details/${variantId}`);
};

export default getVariantDetail;
