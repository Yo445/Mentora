import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../helper/Storage";
import Cover from "../../imgs/libry.jpg";
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
    <section className="bg-90  flex box-border justify-center items-center mt-[30px]">
      <div className="bg-[gainsboro] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#2a626e] mb-[30px]">Login</h2>
          {/* Error Alert */}
          {login.err.map((error, index) => (
            <div
              key={index}
              className="flex inline-flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded  "
              role="alert"
            >
              <span className="block sm:inline pl-2">{login.err}</span>
              <span
                className="inline"
                onClick={(e) => e.currentTarget.parentNode.remove()}
              >
                <svg
                  className="fill-current h-6 w-6"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
           ))}

          <form onSubmit={LoginFun} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border w-full"
              type="text"
              name="name"
              placeholder="Username"
              value={login.username}
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
            />

            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <button
              className="bg-[#20b2aa] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#6dabb8] font-medium w-full"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-sm flex justify-between items-center container-mr ">
            <p className="mr-3 md:mr-0  text-[gray]">don't have an account</p>
            <button
              className="hover:border register text-white bg-[#2a626e] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
              onClick={handlerec}
            >
              Register
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src={Cover}
            alt="login form image"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
