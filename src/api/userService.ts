import axios from "axios";
import { LoginRequest, RegisterRequest } from "../type/user";
import api from ".";

// const apiAuth = axios.create({
//   baseURL: "/api", // URL của server
//   timeout: 5000, // Timeout sau 5 giây
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

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
