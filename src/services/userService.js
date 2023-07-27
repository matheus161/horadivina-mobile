import api from "../api/api";

async function setUserLocation(token, latitude, longitude) {
  try {
    console.log(token);
    const response = await api.put(
      "/user/loc",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getFavoritedInstitutionsFilteredByReligion(
  userId,
  token,
  searchQuery,
  lat,
  lon
) {
  try {
    const response = await api.get(`/user/${userId}/favorite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name: searchQuery,
        lat: lat,
        lon: lon,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default { setUserLocation, getFavoritedInstitutionsFilteredByReligion };
