import api from "../api/api";

async function register(data) {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default register;
