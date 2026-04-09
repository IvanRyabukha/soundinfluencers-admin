import axios from "axios";

export const $api = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true,
});

export const $auth = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true,
});
