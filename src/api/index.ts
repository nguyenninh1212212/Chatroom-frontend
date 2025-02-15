import axios from "axios";
import { LoginRequest, RegisterRequest } from "../type/user";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

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

export const login = async ({ username, password }: LoginRequest) => {
  const res = await api.post("/auth/login", { username, password });
  return res.data;
};

export const register = async ({
  username,
  password,
  fullname,
  email,
}: RegisterRequest) => {
  const res = await api.post("/auth/register", {
    username,
    password,
    email,
    fullname,
  });
  return res.data;
};

export default api;

interface CustomJwtPayload extends JwtPayload {
  sub?: string;
  sub2?: string;
}

export const decodeToken = (): CustomJwtPayload | null => {
  const token = Cookies.get("token"); // Lấy token từ cookie

  if (!token) return null;

  try {
    return jwtDecode<CustomJwtPayload>(token);
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    return null;
  }
};
