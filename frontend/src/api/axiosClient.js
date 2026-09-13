import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:5000", 
// });

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
