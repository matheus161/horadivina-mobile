import api from "../api/api";

async function getAllNewsByInstitution(id, page) {
  try {
    const response = await api.get(`news/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default { getAllNewsByInstitution };
