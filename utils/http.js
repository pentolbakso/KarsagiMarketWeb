import axios from "axios";
import authStore from "../stores/authStore";
import Router from "next/router";
import { logout } from "../stores/authActions";

const http = axios.create({
  timeout: 60000,
  withCredentials: false,
  headers: {},
});

// only for browser
if (typeof window !== "undefined") {
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
        const { data } = error.response;
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          console.log("401", error.response);
          if (
            data.name == "NotAuthenticated" &&
            data.data &&
            data.data.name == "TokenExpiredError"
          ) {
            logout();
            Router.push(
              "/login?message=Sesi%20sudah%20kadaluwarsa%21%20Silahkan%20login%20ulang."
            );
            return Promise.reject({
              message: "Sesi expired. Silahkan logout kemudian login ulang.",
            });
          } else {
            return Promise.reject({
              message: "Login gagal. Silahkan cek user/password anda.",
            });
          }
        } else {
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
}

export default http;
