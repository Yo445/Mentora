import React, { useState } from "react";
import "../components.css";
import { useNavigate } from "react-router-dom";
// import Cover from "../../imgs/2.jpg";
import { setAuthUser } from "../../helper/Storage";

import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const handlere = () => {
    navigate("/login");
  };

  const [register, setRegister] = useState({
    email: "",
    password: "",
    username: "",
    loading: "false",
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:5000/api/auth/register", {
        email: register.email,
        username: register.username,
        password: register.password,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors);
        setRegister({
          ...register,
          loading: false,
          err: "Email already registered.try a different email.",
        });
      });
  };

  return (
    <div
    id="login-popup"
    tabindex="-1"
    class="   fixed top-[20em] right-0 left-0 z-50 h-full items-center justify-center flex"
  >
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <div class="relative bg-white rounded-lg shadow">
        <div class="p-5">
          <h3 class="text-2xl mb-0.5 font-medium"></h3>
          <p class="mb-4 text-sm font-normal text-gray-800"></p>

          <div class="text-center">
            <p class="mb-3 text-2xl font-semibold leading-5 text-slate-900">
              Login to your account
            </p>
            <p class="mt-2 text-sm leading-4 text-slate-600">
              You must be logged in to perform this action.
            </p>
          </div>

          <div class="mt-7 flex flex-col gap-2">
            <button class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                class="h-[18px] w-[18px] "
              />
              Continue with GitHub
            </button>

            <button class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                class="h-[18px] w-[18px] "
              />
              Continue with Google
            </button>

            <button class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <img
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                alt="Google"
                class="h-[18px] w-[18px] "
              />
              Continue with LinkedIn
            </button>
          </div>

          <div class="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
            <div class="h-px w-full bg-slate-200"></div>
            OR
            <div class="h-px w-full bg-slate-200"></div>
          </div>

          <form class="w-full">
            <label for="email" class="sr-only">
              Email address
            </label>
            <input
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Email Address"
              value=""
            />
            <label for="password" class="sr-only">
              Password
            </label>
            <input
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Password"
              value=""
            />
            <p class="mb-3 mt-2 text-sm text-gray-500">
              <a
                href="/forgot-password"
                class="text-blue-800 hover:text-blue-600"
              >
                Reset your password?
              </a>
            </p>
            <button
              type="submit"
              class="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            >
              Continue
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-slate-600">
            Don't have an account?
            <a href="/signup" class="font-medium text-[#4285f4]">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;
