import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Img from "../../assets/img/back.svg";
import { setAuthUser } from "../../helper/Storage";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';

// Define the shape of the state
interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  err: string[];
}
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  // State for form-based login
  const [login, setLogin] = useState<LoginState>({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  // State for Google login
  const [googleCredential, setGoogleCredential] = useState<CredentialResponse | null>(null);

  // State for Facebook login
  const [facebookResponse, setFacebookResponse] = useState<ReactFacebookLoginInfo | null>(null);

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
        setAuthUser({
          id: resp.data.id,
          name: resp.data.name,
          email: resp.data.email,
          role: resp.data.role,
          token: {
            accessToken: resp.data.token.accessToken,
            refreshToken: resp.data.token.refreshToken,
          },
        });

        // Redirect based on user role
        if (resp.data.role === 'student') {
          navigate("/dashboard/students");
        } else if (resp.data.role === 'instructor') {
          navigate("/dashboard/instructor");
        }
        // You can add additional roles if needed
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response?.data?.errors || ["Invalid user. Please Signup!"],
        });
      });
  };


  // Handle Facebook login response
  const handleFacebookLogin = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if ('accessToken' in response) {
      setFacebookResponse(response); // Store the Facebook login response
      axios
        .get("http://localhost:5000/api/users/facebook-login", {
          params: {
            accessToken: response.accessToken,
          },
        })
        .then((resp) => {
          setAuthUser({
            id: resp.data.id,
            name: resp.data.name,
            email: resp.data.email,
            role: resp.data.role,
            token: {
              accessToken: resp.data.token.accessToken,
              refreshToken: resp.data.token.refreshToken,
            },
          });

          // Redirect based on user role
          if (resp.data.role === 'student') {
            navigate("/dashboard/students");
          } else if (resp.data.role === 'instructor') {
            navigate("/dashboard/instructor");
          }
          // No default redirect to /dashboard
        })
        .catch((err) => {
          console.error("Facebook login failed", err);
        });
    } else {
      console.error("Facebook login failed", response);
    }
  };

  // Handle Google login response
  const handleGoogleLogin = (response: CredentialResponse) => {
    setGoogleCredential(response); // Store the Google credential response
  };

  // useEffect to handle Google login after getting the credential response
  useEffect(() => {
    const loginUserWithGoogle = async () => {
      if (googleCredential?.credential) {
        const tokenId = googleCredential.credential; // Extract the Google token

        try {
          const resp = await axios.get("http://localhost:5000/api/users/google-login", {
            params: {
              tokenId, // Pass tokenId as a query parameter
            },
          });
          setAuthUser({
            id: resp.data.id,
            name: resp.data.name,
            email: resp.data.email,
            role: resp.data.role,
            token: {
              accessToken: resp.data.token.accessToken,
              refreshToken: resp.data.token.refreshToken,
            },
          });

          // Redirect based on user role
          if (resp.data.role === 'student') {
            navigate("/dashboard/students");
          } else if (resp.data.role === 'instructor') {
            navigate("/dashboard/instructor");
          }
          // No default redirect to /dashboard
        } catch (error) {
          console.error("Google login failed", error);
        }
      }
    };

    if (googleCredential) {
      loginUserWithGoogle();
    }
  }, [googleCredential, navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        <div className="relative bg-white rounded-lg shadow">
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

              <FacebookLogin
                appId="540494355054611"
                fields="name,email,picture"
                callback={handleFacebookLogin}
              />

              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log("Google login failed")}
                useOneTap
                text="continue_with"
              />

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
                className="mt-4 inline-flex w-full justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-600 focus:ring-2 focus:ring-gray-600 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={login.loading}
              >
                {login.loading ? "Loading..." : "Login"}
              </button>

              <p className="mt-2 text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="ml-1 text-[#4285f4] font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
