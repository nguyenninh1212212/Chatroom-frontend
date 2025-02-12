import axios from "axios";

const api = axios.create({
  baseURL: "/api", // URL của server
  timeout: 5000, // Timeout sau 5 giây
  headers: {
    "Content-Type": "application/json",
  },
});

const getTokenFromCookie = () => {
  const match = document.cookie.match(new RegExp("(^| )authToken=([^;]+)"));
  return match ? match[2] : null;
};

// Axios interceptor để đính kèm token vào header Authorization
api.interceptors.request.use(
  async (config) => {
    // Kiểm tra nếu request là login hoặc register thì không thêm token
    if (
      !config.url?.includes("/auth/login") &&
      !config.url?.includes("/auth/register")
    ) {
      const token = getTokenFromCookie();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
