import api from "../api/api";

async function getAllInstitutions(searchQuery, id, page, lat, lon, userId) {
  try {
    const response = await api.get("/institutions", {
      params: {
        name: searchQuery,
        religion: id,
        page: page,
        limit: 5,
        lat: lat,
        lon: lon,
        id: userId,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addFavorite(id, token) {
  try {
    const response = await api.put(`favorited/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remFavorite(id, token) {
  try {
    const response = await api.put(`favorited/rem/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function subscribe(id, token) {
  try {
    const response = await api.put(`subscription/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function unsubscribe(id, token) {
  try {
    const response = await api.put(`subscription/rem/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  getAllInstitutions,
  addFavorite,
  remFavorite,
  subscribe,
  unsubscribe,
};
