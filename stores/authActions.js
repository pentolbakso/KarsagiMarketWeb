import store from "./authStore";
import * as api from "../services/api";
import authStore from "./authStore";

const STORAGE_KEY = "karsagimarket.data";

export async function loadSession() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    const item = JSON.parse(data);
    //console.log("localStorage", item);
    store.setUser(item.user);
    store.setUserId(item.user._id);
    store.setRole(item.user.role);
    store.setAccessToken(item.accessToken);
    return item.user;
  }
  return null;
}

export async function login(email, password) {
  const response = await api.login(email, password);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
  store.setUser(response.data.user);
  store.setUserId(response.data.user._id);
  store.setRole(response.data.user.role);
  store.setAccessToken(response.data.accessToken);
  return response.data.user;
}

export async function logout() {
  localStorage.removeItem(STORAGE_KEY);
  authStore.clearSession();
}

export async function register(storeTitle, fullname, email, password) {
  const response = await api.register(storeTitle, fullname, email, password);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
  store.setUser(response.data.user);
  store.setUserId(response.data.user._id);
  store.setRole(response.data.user.role);
  store.setAccessToken(response.data.accessToken);
  return response.data.user;
}
