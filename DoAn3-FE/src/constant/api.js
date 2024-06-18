import axios from "axios";

export const apiUser = axios.create({
  baseURL: "https://localhost:44359",
  timeout: 1000 * 60 * 30 * 3, // 90 minutes
});
