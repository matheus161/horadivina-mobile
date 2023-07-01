import api from "../api/api";

async function getAllReligions() {
  try {
    const response = await api.get("/religion");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default { getAllReligions };
