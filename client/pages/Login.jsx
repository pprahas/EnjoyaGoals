import { LockClosedIcon } from "@heroicons/react/20/solid";
import Input from "../components/Input";

export default function Login() {
  return (
    <>
    <div>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      {/* <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com"> */}
    </div>
        
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="px-8 py-6 mt-4 rounded-lg text-left bg-white shadow-lg">
          <div>
            <img className="mx-auto h-30 w-auto" src="logo.png" />
            <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create Account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="-space-y-px rounded-md shadow-sm">
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot_password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Log in
              </button>
              <button
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
              </button>
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
