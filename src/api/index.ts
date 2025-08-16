import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/3`,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});
