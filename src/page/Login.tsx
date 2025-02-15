import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/index";
import Cookies from "js-cookie";
import { LoginRequest } from "../type/user";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      alert("Login failed!");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    mutation.mutate({ username, password });
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-5 bg-blue-500">
      <form
        className="w-1/3  flex flex-col h-auto gap-10  shadow-lg shadow-gray-400 border-blue-400 px-10 py-32 rounded-lg bg-white"
        onSubmit={handleSubmit}
      >
        <p className="text-5xl text-center">LOGIN</p>

        <input
          type="text"
          name="username"
          className="h-12  rounded-3xl border border-gray-400 p-4"
          placeholder="Enter usersname"
        />
        <input
          type="password"
          name="password"
          className="h-12  rounded-3xl border border-gray-400 p-4"
          placeholder="Enter password   "
        />
        <button
          type="submit"
          className="bg-blue-500 h-12 w-full  text-white rounded-3xl"
        >
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <Link to={"/auth/register"} className="text-blue-500">
            register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
