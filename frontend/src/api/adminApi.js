import api from "./axios";

export const getAllUsers = async () => {
  const res = await api.get("/auth/users");
  return res.data;
};

export const getAllOrders = async () => {
  const res = await api.get("/orders/all");
  return res.data;
};
