import api from "../api/api";

async function getAllEventsByInstitution(id, page) {
  try {
    const response = await api.get(`/events/${id}`, {
      params: {
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default { getAllEventsByInstitution };
