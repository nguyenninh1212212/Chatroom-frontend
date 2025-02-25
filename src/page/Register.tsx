import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterRequest } from "../type/user";
import { register } from "../api/index";
import Cookies from "js-cookie";

const Register = () => {
  const [errors, setErrors] = useState<Record<string, string>>({
    username: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    email: "",
  });
  const navagition = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onError: () => {
      alert("Register failed!");
    },
    onSuccess: () => {
      navagition("/");
      alert("Register successful!");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const fullname = formData.get("fullname") as string;
    const email = formData.get("email") as string;

    const validations = [
      {
        field: "username",
        condition: username.length < 6,
        message: "Username must be at least 6 characters",
      },
      {
        field: "password",
        condition: password.length < 6,
        message: "Password must be at least 6 characters",
      },
      {
        field: "confirmPassword",
        condition: password !== confirmPassword,
        message: "Passwords do not match",
      },
      {
        field: "fullname",
        condition: fullname.trim() === "",
        message: "Full name is required",
      },
      {
        field: "email",
        condition: !/\S+@\S+\.\S+/.test(email),
        message: "Invalid email address",
      },
    ];

    const newErrors = validations.reduce(
      (acc, { field, condition, message }) => {
        if (condition) acc[field] = message;
        return acc;
      },
      {} as Record<string, string>
    );

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      mutation.mutate({ username, password, fullname, email });
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <form
        className="w-1/3 flex flex-col h-auto gap-5 shadow-lg shadow-gray-400 border-blue-400 px-10 py-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        <p className="text-4xl text-center font-bold">SIGN UP</p>

        {/* Username */}
        <div className="flex flex-col">
          <input
            type="text"
            name="username"
            className="h-12 rounded-3xl border border-gray-400 p-4"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        {/* Fullname & Email */}
        <div className="flex gap-2">
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              name="fullname"
              className="h-12 rounded-3xl border border-gray-400 p-4"
              placeholder="Enter full name"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>

          <div className="flex flex-col w-1/2">
            <input
              type="email"
              name="email"
              className="h-12 rounded-3xl border border-gray-400 p-4"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <input
            type="password"
            name="password"
            className="h-12 rounded-3xl border border-gray-400 p-4"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <input
            type="password"
            name="confirmPassword"
            className="h-12 rounded-3xl border border-gray-400 p-4"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 h-12 w-full text-white rounded-3xl"
        >
          Sign up
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
