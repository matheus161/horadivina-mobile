import api from "../api/api";

async function getAllInstitutions(searchQuery, id) {
  try {
    const response = await api.get("/institutions", {
      params: { name: searchQuery, religion: id },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default { getAllInstitutions };
