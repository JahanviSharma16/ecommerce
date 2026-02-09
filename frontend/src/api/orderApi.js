import api from "./axios";

export const createOrder = async () => {
  const res = await api.post("/orders");
  return res.data;
};

export const payOrder = async (orderId, success) => {
  const res = await api.post(`/orders/${orderId}/pay`, {
    success
  });
  return res.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders/my");
  return res.data;
};
