import api from "../api/api";

async function login(data) {
  try {
    const response = await api.post("/auth", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default login;
