import api from "./axios";

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};

export const googleLogin = async (userData) => {
  const response = await api.post("/auth/google", userData);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};
