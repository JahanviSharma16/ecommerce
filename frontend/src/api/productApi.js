import api from "./axios";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getUserLikes = async () => {
  const res = await api.get("/likes");
  return res.data;
};

export const likeProduct = async (productId) => {
  const res = await api.post("/likes/like", { productId });
  return res.data;
};

export const unlikeProduct = async (productId) => {
  const res = await api.post("/likes/unlike", { productId });
  return res.data;
};
