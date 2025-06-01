import axios from "axios";

const api = axios.create({
  baseURL: "https://xeno-crm-backend-s4zc.onrender.com/api",
  withCredentials: true, // Required for cookies
});

export default api;
