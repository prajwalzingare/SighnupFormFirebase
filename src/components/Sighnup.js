import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sighnup() {
  //useref for values from input fields
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  //sighnup function from useAuth()
  const { sighnup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //for navigation after sighnup
  const navigate = useNavigate();
  //submit function for form submition
  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      //it will exist out of function after returning error
      return setError("password do not match");
    }
    try {
      setError("");
      setLoading(true);
      await sighnup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("failed to create an account");
    }
    setLoading(false);
  }
  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col font-serif">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-serif">Sign up</h1>

            {/* {JSON.stringify(currentUser?.email)} */}
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
                name="name"
                placeholder="Name"
                required
              />
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
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                ref={confirmPasswordRef}
                placeholder="Confirm Password"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
            <div className="text-center text-sm text-gray-600 mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-blue-500"
                href="."
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-blue-500"
                href="."
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link
              to="/login"
              className="no-underline border-b border-blue text-blue-600"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sighnup;
