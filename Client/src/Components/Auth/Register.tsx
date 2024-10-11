import React, { useState, FormEvent } from "react";
import axios, { AxiosError } from "axios"; // Import AxiosError
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/img/back2.svg";
import { setAuthUser } from "../../helper/Storage";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';

interface RegisterState {
  email: string;
  password: string;
  name: string;
  loading: boolean;
  err: string[];
}

interface ErrorResponse {
  message: string; // Adjust this to match your API's error response structure
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [googleCredential, setGoogleCredential] = useState<CredentialResponse | null>(null);

  const [register, setRegister] = useState<RegisterState>({
    email: "",
    password: "",
    name: "",
    loading: false,
    err: [],
  });
  const RegisterFun = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });

    axios
      .post("http://localhost:5000/api/users/register", {
        email: register.email,
        name: register.name,
        password: register.password,
      })
      .then((resp) => {
        setAuthUser(resp.data);
        setRegister({ ...register, loading: false, err: [] });

        // Role-based redirection
        if (resp.data.role === 'student') {
          navigate("/dashboard/students");
        } else if (resp.data.role === 'instructor') {
          navigate("/dashboard/instructor");
        }
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "An error occurred";
        setRegister({
          ...register,
          loading: false,
          err: [errorMsg],
        });
      });
  };


  // Google Signup

  const googleSignup = async () => {
    setRegister({ ...register, loading: true, err: [] });

    try {
      const resp = await axios.get("http://localhost:5000/api/users/google-login");
      setAuthUser(resp.data); // Save user data in local storage

      // Role-based redirection
      if (resp.data.role === 'student') {
        navigate("/dashboard/students");
      } else if (resp.data.role === 'instructor') {
        navigate("/dashboard/instructor");
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const errorMsg = err.response?.data.message || "Google login/signup failed";
      setRegister({
        ...register,
        loading: false,
        err: [errorMsg],
      });
    }
  };


  // Facebook login or signup using GET
  const facebookSignup = async () => {
    setRegister({ ...register, loading: true, err: [] });

    try {
      const resp = await axios.get("http://localhost:5000/api/users/facebook-login");
      setAuthUser(resp.data); // Save user data in local storage

      // Role-based redirection
      if (resp.data.role === 'student') {
        navigate("/dashboard/students");
      } else if (resp.data.role === 'instructor') {
        navigate("/dashboard/instructor");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.message || "Facebook login/signup failed";
        setRegister({
          ...register,
          loading: false,
          err: [errorMsg],
        });
      } else {
        setRegister({
          ...register,
          loading: false,
          err: ["An unexpected error occurred"],
        });
      }
    }
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

            {/* Social Media Signup */}
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

              {/* <button
                onClick={facebookSignup}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1"
              >
                <FaFacebook fontSize={"23px"} color={"#1877F2"} />
                Continue with Facebook
              </button>
              <GoogleLogin
                onSuccess={googleSignup}
                onError={() => console.log("Google login failed")}
                useOneTap
                text="continue_with"
              /> */}


              <FacebookLogin
                appId="540494355054611"
                fields="email"
                callback={facebookSignup}
                cssClass="facebook-button"
                textButton="Continue with Facebook"
                icon="fa-facebook"
              />

              <GoogleLogin
                onSuccess={googleSignup}
                onError={() => console.log("Google Sirnup failed")}
                useOneTap
                text="signup_with"
              />
            </div>

            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>

            <form onSubmit={RegisterFun} className="w-full">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Name"
                value={register.name}
                onChange={(e) => setRegister({ ...register, name: e.target.value })}
              />
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
                value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
              />
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Password"
                value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
              />
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                disabled={register.loading}
              >
                {register.loading ? "Creating..." : "Continue"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Already have an account?
              <a href="/login" className="ml-1 font-medium text-[#4285f4]">Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
