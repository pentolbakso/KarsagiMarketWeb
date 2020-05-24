import * as api from "../services/api";
import userStore from "./userStore";

export async function recentProducts() {
  const response = await api.fetchProducts(null, "", null, 20);
  userStore.setRecentProducts(response.data.data);
  return response.data.data;
}

export async function browseProducts(category, keyword) {
  const response = await api.fetchProducts(
    category == "all" ? null : category,
    keyword || ""
  );
  userStore.setMoreProducts(true);

  const resp = response.data;
  const { data } = response.data;
  if (data.length < resp.limit) {
    console.log("no more data");
    userStore.setMoreProducts(false);
  }
  userStore.setProducts(response.data.data);
  userStore.setProductTotal(response.data.total);
  return response.data.data;
}

export async function moreProducts(category, keyword) {
  const skip = userStore.getProducts().length;
  const response = await api.fetchProducts(
    category ? (category == "all" ? null : category) : null,
    keyword,
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

export async function getAllStoreProducts(id) {
  const response = await api.fetchAllStoreProducts(id);
  return response.data.data;
}
