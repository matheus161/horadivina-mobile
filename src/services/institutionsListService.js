import api from "../api/api";

async function getAllInstitutions(searchQuery, id, page, limit, lat, lon) {
  try {
    const response = await api.get("/institutions", {
      params: {
        name: searchQuery,
        religion: id,
        page: page,
        limit: limit,
        lat: lat,
        lon: lon,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default { getAllInstitutions };
