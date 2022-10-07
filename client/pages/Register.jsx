import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(firstName, lastName, username, email, password);
    axios
      .post("http://localhost:8080/register", {
        firstName,
        lastName,
        username,
        email,
        password,
      })
      .then((res) => console.log("Posting data", res))
      .catch((err) => console.log(err));
    // fetch("https://localhost:8080/register", {
    //   method: "POST",
    //   crossDomain: true,
    //   headers: {
    //     "content-type": "application/json",
    //     Accept: "application/json",
    //     "Access-control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     firstName,
    //     lastName,
    //     username,
    //     email,
    //     password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data, "userRegister");
    //   });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 rounded-lg text-left bg-white shadow-lg">
          <div>
            {/* <h1 className=" mx-auto h-12 w-auto" alt="Your Company">
              Enjoyagoals
            </h1> */}

            <img className="mx-auto h-30 w-auto" src="logo.png" />
            {/* <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-900">
              Welcome to Enjoyagoals!
            </h1> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {/* Enter your Email to recover your password{" "} */}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account?
              </a>
            </p>
          </div>
          {/* <form className="mt-8 space-y-6" action="#" method="POST"> */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {/* <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                />
              </div> */}
              {/* <Input label="text" htmlFor="text" placeholder="First Name" /> */}
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="first_name"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="First Name"
                onChange={(e) => setfirstName(e.target.value)}
                value={firstName}
              />
              {/* <Input label="text" htmlFor="text" placeholder="Last Name" /> */}
              <input
                id="last_name"
                name="last-name"
                type="text"
                autoComplete="last_name"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Last Name"
                onChange={(e) => setlastName(e.target.value)}
                value={lastName}
              />
              <input
                id="username"
                name="last_name"
                type="text"
                autoComplete="last_name"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Username"
                onChange={(e) => setusername(e.target.value)}
                value={username}
              />
              {/* <Input label="text" htmlFor="text" placeholder="Username" /> */}
              {/* <Input
                label="email"
                htmlFor="email-address"
                placeholder="Email address"
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
              {/* <Input
                label="password"
                htmlFor="password"
                placeholder="Password"
              /> */}
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
              />
              {/* <Input
                label="password"
                htmlFor="password"
                placeholder="Confirm Password"
              /> */}
              {/* <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="confirm_password"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
              /> */}
              <div className="border-t border-gray-200 pt-4"></div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Account
              </button>
              <div>
                {/* <p className="mt-2 text-center text-sm text-gray-600">
                  <b>Or</b>
                </p> */}
              </div>
              &nbsp;
              <div>
                {/* <img
                  className="mx-auto h-12 w-auto"
                  src={SignIn}
                  onclick="this.src='{SignIn2}'"
                  alt="Google"
                /> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
