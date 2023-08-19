import api from "../api/api";

async function getAllFavorites(searchQuery, page, lat, lon, userId) {
  try {
    const response = await api.get("/user", {
      params: {
        name: searchQuery,
        page: page,
        limit: 5,
        lat: lat,
        lon: lon,
        id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    console.log("ID", id);
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default { getAllFavorites, getUserById };
