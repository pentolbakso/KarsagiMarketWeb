import * as api from "../services/api";
import userStore from "./userStore";

export async function browseProducts(category) {
  const response = await api.fetchProducts(category == "all" ? null : category);
  userStore.setProducts(response.data.data);
  return response.data.data;
}

export async function getProduct(id) {
  const response = await api.fetchProduct(id);
  return response.data;
}

export async function getStore(id) {
  const response = await api.fetchStore(id);
  return response.data;
}

export async function getStoreProducts(id) {
  const response = await api.fetchStoreProducts(id);
  return response.data.data;
}
