import axios from "axios";

const baseURL = "https://dev.huluchat.com/hulufund/";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

