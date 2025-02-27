import { axios } from "../lib/axios";

const getVariants = async (projectID, page, pageSize, filterModel) => {
  // Construct comma separated filters category_value pairs if active
  const filters = filterModel
    .map((c) =>
      c.filters
        .filter((f) => f.active)
        .map((f) => `${c.label}__${f.value}`)
        .join(",")
    )
    .filter((f) => f)
    .join(",");

  let query = `/variants/${projectID}?page=${page}&page_size=${pageSize}`;
  if (filters) {
    query += `&filters=${filters}`;
  }
  const response = await axios.get(query);
  return response.data;
};

export default getVariants;
