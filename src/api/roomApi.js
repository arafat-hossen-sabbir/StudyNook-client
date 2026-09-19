import api from "./axios";

export const getRooms = async () => {
  const response = await api.get("/rooms");

  return response.data;
};

export const getRoomById = async (id) => {
  const response = await api.get(`/rooms/${id}`);

  return response.data;
};
