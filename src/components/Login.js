import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  //useref for values from input fields
  const emailRef = useRef();
  const passwordRef = useRef();

  //sighnup function from useAuth()
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //submit function for form submition
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("failed to login an account");
    }
    setLoading(false);
  }
  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col font-serif">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-serif">login </h1>

            {/* {JSON.stringify(currentUser)} */}
            {error && (
              <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-4 mb-2">
                  {error}
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                ref={emailRef}
                placeholder="Email"
                required
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                ref={passwordRef}
                placeholder="Password"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
              >
                Login Account
              </button>
            </form>
          </div>

          <div className="text-grey-dark mt-6">
            Don't have an account?
            <a
              className="no-underline border-b border-blue text-blue-600"
              href="/sighnup"
            >
              {" "}
              sighnup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
