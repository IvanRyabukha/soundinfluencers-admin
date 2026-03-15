import axios from "axios";

export const $api = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const $auth = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
