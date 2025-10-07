import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000", // adjust as per your backend
});

// Automatically attach JWT if available
axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
