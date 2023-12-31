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
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(name, email, token) {
  try {
    const response = await api.put(
      "/user",
      {
        name: name,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function changePass(password, newPassword, token) {
  try {
    const response = await api.put(
      "/user/change-pass",
      {
        password: password,
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateRatio(ratio, token) {
  try {
    const response = await api.put(
      "/user/ratio",
      {
        ratio: ratio,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(token) {
  try {
    const response = await api.delete("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  getAllFavorites,
  getUserById,
  update,
  changePass,
  updateRatio,
  remove,
};
