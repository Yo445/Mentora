import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Img from "../../assets/img/back.svg";
import { setAuthUser } from "../../helper/Storage";

// Define the shape of the state
interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  err: string[];
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState<LoginState>({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  // Normal email/password login handler
  const LoginFun = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:5000/api/users/login", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/dashboard");
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response?.data?.errors || ["Invalid user. Please Signup!"],
        });
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Google login function
  const googleLogin = () => {
    window.open("http://localhost:5000/api/users/google-login", "_self");
  };

  // Facebook login function
  const facebookLogin = () => {
    window.open("http://localhost:5000/api/users/facebook-login", "_self");
  };

  // On component mount, check if token was returned in URL query parameters (for OAuth login)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      setAuthUser({ token });
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div
      id="login-popup"
      tabIndex={-1}
      className="fixed right-0 left-0 z-50 h-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-0 w-full h-full bg-gray-900 opacity-70"></div>
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-[white] rounded-lg shadow">
          <div className="p-5">
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Login to your account
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You must be logged in to perform this action.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-2">
              {/* Error Alert */}
              {login.err.map((error, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded"
                  role="alert"
                >
                  <span>{error}</span>
                  <button
                    onClick={(e) => {
                      const parent = e.currentTarget.parentNode as HTMLElement | null;
                      parent?.remove();
                    }}
                    className="text-red-700 text-[20px]"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={facebookLogin}
              >
                <FaFacebook fontSize={"23px"} color={"#1877F2"} />
                Continue with Facebook
              </button>

              <button
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={googleLogin}
              >
                <FcGoogle fontSize={"23px"} />
                Continue with Google
              </button>
            </div>

            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>

            <form onSubmit={LoginFun} className="w-full">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
                value={login.email}
                onChange={handleInputChange}
              />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Password"
                value={login.password}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                disabled={login.loading}
              >
                Continue
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?
              <Link to="/signup" className="font-medium text-[#4285f4]">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
