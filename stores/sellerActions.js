import store from "./authStore";
import * as api from "../services/api";
import authStore from "./authStore";
import sellerStore from "./sellerStore";

export async function updateStore(values) {
  const storeId = sellerStore.getShop()._id;
  const response = await api.updateStore(storeId, values);
  console.log(response.data);
  sellerStore.setShop(response.data);
}

export async function getStore() {
  const userId = authStore.getUserId();
  const response = await api.fetchStoreList(userId);
  //console.log(response.data);
  // right now we only support 1 store per seller
  if (response.data.data.length > 0) {
    const store = response.data.data[0];
    sellerStore.setShop(store);
  } else {
    sellerStore.setShop(null);
    sellerStore.setProducts([]);
  }
}

export async function createProduct(values) {
  const shop = sellerStore.getShop();
  const response = await api.createProduct(shop._id, values);
  console.log(response.data);
  await getProducts();
}

export async function updateProduct(id, values) {
  const response = await api.updateProduct(id, values);
  console.log(response.data);
  await getProducts();
}

export async function getProducts() {
  const shop = sellerStore.getShop();
  const response = await api.fetchProductList(shop._id);
  console.log("products", response.data);
  // right now we only support 1 store per seller
  sellerStore.setProducts(response.data.data);
}

export async function uploadImage(file) {
  console.log("uploading image");
  const response = await api.uploadImage(file);
  console.log(response.data);
  return response.data;
}
