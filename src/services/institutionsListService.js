import api from "../api/api";

async function getAllInstitutions(searchQuery, id, page, lat, lon) {
  try {
    console.log(lat, lon);
    const response = await api.get("/institutions", {
      params: {
        name: searchQuery,
        religion: id,
        page: page,
        limit: 5,
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
