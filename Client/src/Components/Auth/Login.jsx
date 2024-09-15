import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../helper/Storage";
import Cover from "../../imgs/libry.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Img from "../../assets/img/register_bg_2.png";
import "../components.css";
const Login = () => {
  const navigate = useNavigate();
  const handlerec = () => {
    navigate("/signup");
  };

  const [login, setLogin] = useState({
    username: "",
    password: "",
    loading: "false",
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...Login, loading: true, err: [] });
    axios
      .post("http://localhost:5000/api/auth/login", {
        username: login.username,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...Login, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors);
        setLogin({
          ...login,
          loading: false,
          err: errors.response?.data?.errors || [
            "Invalid user. Please Signup!",
          ],
        });
      });
  };

  return (
    <div
      id="login-popup"
      tabIndex="-1"
      className="fixed right-0 left-0 z-50 h-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
            <div className="absolute top-0 w-full h-full bg-gray-900 opacity-70"></div>

      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-[white] rounded-lg shadow">
          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium"></h3>
            <p className="mb-4 text-sm font-normal text-gray-800"></p>
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Login to your account
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You must be logged in to perform this action.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-2">
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <FaFacebook fontSize={"23px"} color={"#1877F2"} />
                Continue with Facebook
              </button>

              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <FcGoogle fontSize={"23px"} />
                Continue with Google
              </button>
            </div>

            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>

            <form className="w-full">
              <label for="email" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autocomplete="email"
                required=""
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
                value=""
              />
              <label for="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Password"
                value=""
              />
              <p className="mb-3 mt-2 text-sm text-gray-500">
                <a
                  href="/forgot-password"
                  className="text-blue-800 hover:text-blue-600"
                >
                  Reset your password?
                </a>
              </p>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                Continue
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?
              <a href="/signup" className="font-medium text-[#4285f4]">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
