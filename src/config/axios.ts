import axios from "axios";
import { BACKEND_URL } from "./constants";

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    common: {
      Authorization: `Bearer ${
        localStorage.getItem("jwt")
          ? JSON.parse(localStorage.getItem("jwt")!).jwtToken
          : ""
      }`,
    },
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(
      localStorage.getItem("persist:auth")!
    ).accessToken.split('"')[1];
    if (accessToken) {
      console.log("accessToken", accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
