import http from "../utils/http";

//production
// export const API_URL = 'https://jetwrider.azurewebsites.net';

//staging
export const API_URL = "http://192.168.1.101:8080";

// ------- Auth ------------------
export const me = () => {
  return http.get(`${API_URL}/me`);
};
export const login = (email, password) => {
  return http.post(`${API_URL}/authentication`, {
    strategy: "local",
    email,
    password,
  });
};
// as seller
export const register = (storeTitle, fullname, email, password) => {
  return http.post(`${API_URL}/register`, {
    storeTitle,
    fullname,
    email,
    password,
  });
};

// ------- Shop------------------
export const updateStore = (storeId, values) => {
  return http.patch(`${API_URL}/stores/${storeId}`, values);
};
export const fetchStoreList = (userId) => {
  return http.get(`${API_URL}/users/${userId}/stores`);
};

// ------- Products------------------
export const fetchProductList = (storeId) => {
  return http.get(`${API_URL}/stores/${storeId}/products`, {
    params: {
      $limit: 100,
    },
  });
};
export const createProduct = (storeId, values) => {
  return http.post(`${API_URL}/stores/${storeId}/products`, values);
};
export const updateProduct = (productId, values) => {
  return http.patch(`${API_URL}/products/${productId}`, values);
};

// ------- Etc ------------------
export const uploadImage = (file) => {
  let formData = new FormData();
  formData.append("file", file);
  console.log("formdata", formData);
  return http.post(`${API_URL}/uploads`, formData);
};

// ------ Public ----------------
export const fetchProducts = (category, skip) => {
  return http.get(`${API_URL}/products`, {
    params: { category, $skip: skip },
  });
};
export const fetchProduct = (id) => {
  return http.get(`${API_URL}/products/${id}`);
};
export const fetchStore = (id) => {
  return http.get(`${API_URL}/stores/${id}`);
};
export const fetchStoreProducts = (storeId, skip) => {
  return http.get(`${API_URL}/products`, {
    params: {
      store: storeId,
      $skip: skip,
    },
  });
};

export const fetchAllStoreProducts = (storeId) => {
  return http.get(`${API_URL}/products`, {
    params: {
      $limit: 50,
    },
  });
};
