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

export default { setUserLocation };
