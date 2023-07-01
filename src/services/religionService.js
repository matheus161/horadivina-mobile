import api from "../api/api";

async function getAllReligions(name) {
  try {
    const response = await api.get("/religion", { params: { name } });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default { getAllReligions };
