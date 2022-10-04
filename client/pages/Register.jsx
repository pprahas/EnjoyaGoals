import { LockClosedIcon } from "@heroicons/react/20/solid";
import Input from "../components/Input";

export default function Register() {
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="px-8 py-6 mt-4 rounded-lg text-left bg-white shadow-lg">
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
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
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
              <Input label="text" htmlFor="text" placeholder="First Name" />
              <Input label="text" htmlFor="text" placeholder="Last Name" />
              <Input label="text" htmlFor="text" placeholder="Username" />
              <Input
                label="email"
                htmlFor="email-address"
                placeholder="Email address"
              />
              <Input
                label="password"
                htmlFor="password"
                placeholder="Password"
              />
              <Input
                label="password"
                htmlFor="password"
                placeholder="Confirm Password"
              />

              <div class="border-t border-gray-200 pt-4"></div>
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
