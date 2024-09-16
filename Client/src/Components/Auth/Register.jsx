import React, { useState } from "react";
import "../components.css";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../helper/Storage";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Img from "../../assets/img/register_bg_2.png";
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
              Create your account
            </p>
            <p className="mt-2 text-sm leading-4 text-slate-600">
              You can register with google or facebook
            </p>
          </div>

          {/* Use Social Media */}
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
          <label for="username" className="sr-only">
              Username
            </label>
            <input
              name="username"
              type="text"
              autocomplete="username"
              required=""
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Username"
              value=""
            />
            <label for="email" className="sr-only">
              Email address
            </label>
            <input
              name="email"
              type="email"
              autocomplete="email"
              required=""
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
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
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            >
              Continue
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            already have an account!
            <a href="/login" className="font-medium text-[#4285f4]">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;
