import React, { useState, FormEvent } from "react";
import "../components.css";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../helper/Storage";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Img from "../../assets/img/back2.svg";
import axios from "axios";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

interface RegisterState {
  email: string;
  password: string;
  username: string;
  loading: string;
  err: string[];
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  const [register, setRegister] = useState<RegisterState>({
    email: "",
    password: "",
    username: "",
    loading: "false",
    err: [],
  });

  const RegisterFun = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegister({ ...register, loading: "true", err: [] });
    axios
      .post("http://localhost:5000/api/auth/register", {
        email: register.email,
        username: register.username,
        password: register.password,
      })
      .then((resp) => {
        setRegister({ ...register, loading: "false", err: [] });
        setAuthUser(resp.data);
        navigate("/dashboard");
      })
      .catch((errors) => {
        console.log(errors);
        setRegister({
          ...register,
          loading: "false",
          err: ["Email already registered. Try a different email."],
        });
      });
  };

  const responseFacebook = (response: any) => {
    axios.post("http://localhost:5000/api/auth/facebook", { 
      accessToken: response.accessToken 
    })
    .then(resp => {
      setAuthUser(resp.data);
      navigate("/dashboard");
    })
    .catch(err => {
      console.log(err);
      setRegister({ ...register, err: ["Facebook authentication failed."] });
    });
  };

  const responseGoogle = (response: any) => {
    axios.post("http://localhost:5000/api/auth/google", { 
      id_token: response.tokenId 
    })
    .then(resp => {
      setAuthUser(resp.data);
      navigate("/dashboard");
    })
    .catch(err => {
      console.log(err);
      setRegister({ ...register, err: ["Google authentication failed."] });
    });
  };

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
                Create your account
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You can register with Google or Facebook
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-2">
              {register.err.map((error, index) => (
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

              <FacebookLogin
                appId="YOUR_FACEBOOK_APP_ID"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FaFacebook fontSize={"23px"} color={"#1877F2"} />
                    Continue with Facebook
                  </button>
                )}
              />

              <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FcGoogle fontSize={"23px"} />
                    Continue with Google
                  </button>
                )}
              />
            </div>

            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>

            <form onSubmit={RegisterFun} className="w-full">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Username"
                value={register.username}
                onChange={(e) =>
                  setRegister({ ...register, username: e.target.value })
                }
              />
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
                value={register.email}
                onChange={(e) =>
                  setRegister({ ...register, email: e.target.value })
                }
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
                value={register.password}
                onChange={(e) =>
                  setRegister({ ...register, password: e.target.value })
                }
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