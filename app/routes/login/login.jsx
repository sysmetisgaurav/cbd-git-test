import { Link } from "react-router";
import { useNavigate } from "react-router";
import React, { useState, useEffect, useMemo } from "react";

import { LOGIN_REQUEST, PUBLIC_CLIENT_APPLICATION, TOKEN_REQUEST } from "./msalConfig";
import "./login.css";
import { Google, Logo, Microsoft } from "../../assets/image";
import { useFormik } from "formik";
import { googleLogout } from "@react-oauth/google";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import * as CONSTANTS from '../../utils/constants'

import { useLoader } from '../../loadercontext';
export default function Login() {
  let navigate = useNavigate();
  const { isLoading, showLoader, hideLoader } = useLoader();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [isOTPInitiated, setOTPInitiate] = useState(false);
  useEffect(() => {
    console.log("Login  loading");
    //localStorage.clear();
    const storedItems = JSON.parse(localStorage.getItem("userSession")) || {};
    console.log("useEffect:userSession>>", storedItems);
    if (storedItems.role == "Customer") {
       navigate("/dashboard",{ replace: true });
    } else if (storedItems.role == "Admin") {
       navigate("/admindashboard",{ replace: true });
    }
  }, []); // Empty dependency array ensures this effect runs only once
  const inputRefs = useMemo(() => Array.from({ length: 6 }, () => React.createRef()), []);

  async function requestOTP() {
    try {
      showLoader();
      const postBody = {
        email: email,
      };
     
      const response = await fetch(
        `${CONSTANTS.BASE_URL}${CONSTANTS.REQUEST_LOGIN_OTP}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );

      if (response.ok) {
        hideLoader();
        const jsonResponse = await response.json();
        console.log("POST request successful:", jsonResponse);
        setOTPInitiate(true);
      } else {
        throw new Error("POST request failed");
      }
    } catch (error) {
      console.log("error:requestOTP",error);
     }
  }

  async function verifyOTP() {
    try {
      showLoader();
      const postBody = {
        email: email,
        otp: otp,
      };
      const response = await fetch(
        `${CONSTANTS.BASE_URL}${CONSTANTS.VERIFY_LOGIN_OTP}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );

      hideLoader();
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("POST request successful:", jsonResponse);
        if (jsonResponse.statusCode == 200) {
          jsonResponse.data.role = jsonResponse.data.roles[0];
          // to test refresh token
          jsonResponse.data.refreshToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBjYmQuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IkFkbWluIENCRCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzQ4MDc1MTc0LCJpc3MiOiJodHRwczovL2NiZC1kZXYtYXBpLWF4YWRhMmI0aHBid2hzaDkuY2VudHJhbGluZGlhLTAxLmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjoiaHR0cHM6Ly9jYmQtZGV2LWFwaS1heGFkYTJiNGhwYndoc2g5LmNlbnRyYWxpbmRpYS0wMS5henVyZXdlYnNpdGVzLm5ldCJ9.1BJpdzYsCyHA8hCaDvHQWPuk2f9SNy_ad5ybQYmvIA0"
          localStorage.setItem("userSession", JSON.stringify(jsonResponse.data));
          if (jsonResponse.data.role == "Customer") {
             navigate("/dashboard",{ replace: true });
          } else if (jsonResponse.data.role == "Admin") {
             navigate("/admindashboard",{ replace: true });
          }
        }
      } else {
        throw new Error("POST request failed");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function googleLogin(authToken) {
    try {
      showLoader();
      const postBody = {
        authToken: authToken,
      };
      const response = await fetch(
        `${CONSTANTS.BASE_URL}${CONSTANTS.GOOGLE_LOGIN_OTP}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );

      if (response.ok) {
        hideLoader();
        const jsonResponse = await response.json();
        console.log("POST request successful:", jsonResponse);
        if (jsonResponse.statusCode == 200) {
          jsonResponse.data.role = jsonResponse.data.roles[0];
          // to test refresh token
          jsonResponse.data.token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBjYmQuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IkFkbWluIENCRCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzQ4MDc1MTc0LCJpc3MiOiJodHRwczovL2NiZC1kZXYtYXBpLWF4YWRhMmI0aHBid2hzaDkuY2VudHJhbGluZGlhLTAxLmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjoiaHR0cHM6Ly9jYmQtZGV2LWFwaS1heGFkYTJiNGhwYndoc2g5LmNlbnRyYWxpbmRpYS0wMS5henVyZXdlYnNpdGVzLm5ldCJ9.1BJpdzYsCyHA8hCaDvHQWPuk2f9SNy_ad5ybQYmvIA0"
          localStorage.setItem("userSession", JSON.stringify(jsonResponse.data));
          if (jsonResponse.data.role == "Customer") {
             navigate("/dashboard",{ replace: true });
          } else if (jsonResponse.data.role == "Admin") {
             navigate("/admindashboard",{ replace: true });
          }
        }
      } else {
        throw new Error("POST request failed");
      }
    } catch (error) { }
  }

  async function microsoftLogin(authToken) {
    try {
      const postBody = {
        authToken: authToken,
      };
      showLoader();
      const response = await fetch(
        `${CONSTANTS.BASE_URL}${CONSTANTS.MICROSOFT_LOGIN_OTP}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );
      hideLoader();
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("POST request successful:", jsonResponse);
        if (jsonResponse.statusCode == 200) {
          jsonResponse.data.role = jsonResponse.data.roles[0];
          localStorage.setItem("userSession", JSON.stringify(jsonResponse.data));
          if (jsonResponse.data.role == "Customer") {
             navigate("/dashboard",{ replace: true });
          } else if (jsonResponse.data.role == "Admin") {
             navigate("/admindashboard",{ replace: true });
          }
        }
      } else {
        throw new Error("POST request failed");
      }
    } catch (error) { }
  }

  const handleSignIn = async () => {
    const loginResponse = await PUBLIC_CLIENT_APPLICATION.loginPopup(LOGIN_REQUEST);
    if (loginResponse.account) {
      PUBLIC_CLIENT_APPLICATION.setActiveAccount(loginResponse.account);
    }
    const tokenResponse = await PUBLIC_CLIENT_APPLICATION.acquireTokenSilent(TOKEN_REQUEST);
    console.log(tokenResponse.idToken);
    microsoftLogin(tokenResponse.idToken);
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // allow only single digit numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    // Combine OTP automatically
    setOtp(newOtp.join(""));
  };


  function getLoginView() {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={Logo} alt="Cyber Logo" className="h-12 mb-2" />
            <h2 className="text-2xl font-semibold text-[#1F3F71]">Sign in</h2>
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block poppins-medium text-sm font-medium text-gray-700 mb-4">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 poppins-light rounded-lg border"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          {/* Continue button */}
          <button
            type="submit"
            className="w-full bg-[#2d4b8b] text-white poppins-medium p-3 rounded-lg hover:bg-blue-800 transition"
            onClick={(e) => {
              console.log("helloooo");
              requestOTP();
            }}
          >
            Continue
          </button>

          {/* Help text */}
          <p className="text-xs text-gray-500 mt-2">
            You’ll receive a 6-digit code via email to complete the sign-in process.
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Sign in with Google */}
          <button className="w-full border-2 border-gray-300 flex items-center justify-center rounded-md py-2 mb-3 hover:bg-blue-50 transition">

            <GoogleOAuthProvider clientId="939704780073-bt67j6hiftjq7db9dsv6pr7kv1i4tls3.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  googleLogin(credentialResponse.credential)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </button>

          {/* Sign in with Microsoft */}
          <button className="w-full border border-gray-300 flex items-center justify-center rounded-md py-2 hover:bg-gray-100 transition"
            onClick={handleSignIn}
          >
            <img src={Microsoft} alt="Microsoft" className="h-5 mr-2" />
            <span className="text-sm font-medium text-gray-700">Sign in with Microsoft</span>
          </button>
        </div>
      </div>
    );
  }

  function getOTPView() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center">
          <img src={Logo} alt="Logo" className="h-12 mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-primary mb-1">Enter the 6-digit code sent to you at:</h2>
          <p className="text-lg font-bold text-primary mb-6">{email}</p>

          <div className="flex justify-center space-x-2 mb-3">
            {inputRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                maxLength={1}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleInputChange(e, index)}
                value={otp[index]}
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-4">Tip: Make sure to check your inbox and spam folders</p>

          <div className="text-right">
            <button
              className="text-sm font-medium text-gray-800 underline mb-6 hover:text-blue-600"
              onClick={() => {
                requestOTP();
              }}
            >
              Resend code
            </button>
          </div>
          <button
            onClick={() => {
              verifyOTP();
            }}
            className="w-full bg-[#2d4b8b] text-white py-3 rounded-lg hover:bg-blue-900 transition mb-4"
          >
            Continue
          </button>

          <button className="text-blue-600 text-sm font-medium hover:underline"
            onClick={() => {
              setOTPInitiate(false);
              setOtp(new Array(6).fill(""));
            }}
          >Sign in another way</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      {isOTPInitiated == true ? getOTPView() : getLoginView()}
    </div>
  );
}
