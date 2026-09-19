import api from "./axios";

export const getRooms = async (params = {}) => {
  const response = await api.get("/rooms", {
    params,
  });

  return response.data;
};

export const getRoomById = async (id) => {
  const response = await api.get(`/rooms/${id}`);

  return response.data;
};
