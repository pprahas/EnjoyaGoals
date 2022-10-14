import { LockClosedIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email);
    axios
      .post("http://localhost:8080/forgot_password", {
        email,
      })
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
        navigate("/reset_password");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.msg);
      });
  };

  return (
    <>
      {/* <div className="flex h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-grey-50 mt-10"> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* <div className="w-full max-w-md space-y-8 h-full items-center"> */}
        {/* <div className="w-full max-w-md space-y-8 h-full items-center"> */}
        <div className="px-8 py-6 mt-4 rounded-lg text-left bg-white shadow-lg">
          <div>
            <img className="mx-auto h-30 w-auto" src="logo.png" />
            <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot Password
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your Email to generate a token{" "}
            </p>
          </div>
          {/* <form className="mt-8 space-y-6" action="#" method="POST"> */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* <input
              onChange={(e) => handle(e)}
              id="username"
              value={data.username}
              type="hidden"
              name="remember"
              defaultValue="true"
            /> */}

            <div className="-space-y-px rounded-md shadow-sm">
              {/* <Input
                label="email"
                htmlFor="email-address"
                placeholder="Email address"
              /> */}
              {/* <Input
                label="password"
                htmlFor="password"
                placeholder="Password"
              /> */}
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email Address"
                onChange={(e) => setemail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Create Account
                </a>
              </div>
              <div className="text-sm">
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </a>
              </div>
            </div>
            <p className="mt-2 text-center text-sm text-red-600">{message} </p>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                // onClick={() => {
                //   if (login_attempt == true) {
                //     history.push("/profile_information");
                //   }
                // }}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Generate Token
              </button>
              {/* <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Log in with Google
              </button> */}
              {/* <div
                className="group relative flex w-full justify-center rounded-md
                border border-transparent py-2 px-4 text-sm  bg-indigo-600
                font-medium text-white hover:bg-indigo-700 focus:outline-none
                focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2"
              >
                <img
                  src="log-in-with-google.png"
                  alt=""
                  className="h-5 mb-0 w-200"
                />
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
