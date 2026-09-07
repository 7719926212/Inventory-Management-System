import api from "./api";

export const getProducts = async () => (await api.get("/api/products")).data;
export const getProduct = async (id) => (await api.get(`/api/products/${id}`)).data;
export const createProduct = async (data) => (await api.post("/api/products", data)).data;
export const updateProduct = async (id, data) => (await api.put(`/api/products/${id}`, data)).data;
export const deleteProduct = async (id) => (await api.delete(`/api/products/${id}`)).data;

export const getCategories = async () => (await api.get("/api/categories")).data;
export const createCategory = async (data) => (await api.post("/api/categories", data)).data;
