import axios from "axios";
import authStore from "../stores/authStore";

const http = axios.create({
  timeout: 60000,
  withCredentials: false,
  headers: {},
});

http.interceptors.request.use(
  (request) => {
    const token = authStore.getAccessToken();
    if (token && token.length > 0)
      request.headers.Authorization = `Bearer ${token}`;
    console.log("REQ:", request.url + " -> " + request.data);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    //console.log('RESP:', response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      if (error.response.status === 401) {
        console.log(error.response);
        if (error.response.data.name == "NotAuthenticated")
          return Promise.reject({
            message: "Login gagal. Silahkan cek user/password anda.",
          });
        else
          return Promise.reject({
            message: "Token expired. Please re-login",
          });
      } else {
        const { data } = error.response;
        console.log("ERROR response:", data);
        let message = data.message || error.message;
        return Promise.reject({ message, raw: data });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      return Promise.reject({
        message:
          "Ada masalah ketika menghubungi server. Silahkan cek kembali koneksi internet anda.",
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({ message: error.message });
    }
  }
);

export default http;
