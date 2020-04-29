import * as api from "../services/api";
import userStore from "./userStore";

export async function browseProducts(category) {
  const response = await api.fetchProducts(category == "all" ? null : category);
  userStore.setMoreProducts(true);

  const resp = response.data;
  const { data } = response.data;
  if (data.length < resp.limit) {
    console.log("no more data");
    userStore.setMoreProducts(false);
  }
  userStore.setProducts(response.data.data);
  return response.data.data;
}

export async function moreProducts(category) {
  const skip = userStore.getProducts().length;
  const response = await api.fetchProducts(
    category == "all" ? null : category,
    skip > 0 ? skip : null
  );
  const resp = response.data;
  const { data } = response.data;
  if (data.length < resp.limit) {
    console.log("no more data");
    userStore.setMoreProducts(false);
  }

  userStore.addProducts(data);
  return data;
}

export async function getProduct(id) {
  const response = await api.fetchProduct(id);
  return response.data;
}

export async function getStore(id) {
  const response = await api.fetchStore(id);
  return response.data;
}

export async function getStoreProducts(id, skip) {
  const response = await api.fetchStoreProducts(id, skip);
  return response.data;
}
