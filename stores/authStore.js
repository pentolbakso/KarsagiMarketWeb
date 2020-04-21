import * as remx from "remx";

const initialState = {
  user: null,
  userId: null,
  role: null,
  accessToken: null,
};

const state = remx.state(initialState);

const setters = remx.setters({
  setUser(profile) {
    state.user = profile;
  },
  setUserId(id) {
    state.userId = id;
  },
  setRole(role) {
    state.role = role;
  },
  setAccessToken(token) {
    state.accessToken = token;
  },
  clearSession() {
    state.user = null;
    state.userId = null;
    state.accessToken = null;
  },
});

const getters = remx.getters({
  getUser() {
    return state.user;
  },
  getUserId() {
    return state.userId;
  },
  getAccessToken() {
    return state.accessToken;
  },
  isSeller() {
    return state.role == "user";
  },
  isAdmin() {
    return state.role == "admin";
  },
  isKurir() {
    return state.role == "kurir";
  },
});

export default {
  ...getters,
  ...setters,
};
