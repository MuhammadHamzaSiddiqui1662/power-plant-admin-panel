import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/api",
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
