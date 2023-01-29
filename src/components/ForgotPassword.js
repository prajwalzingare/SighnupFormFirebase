import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handelsubmit(event) {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your Email for further");
    } catch (error) {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col font-serif">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-serif">
              Password Reset{" "}
            </h1>

            {/* {JSON.stringify(currentUser)} */}
            {error && (
              <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-4 mb-2">
                  {error}
                </div>
              </div>
            )}
            {message && (
              <div role="alert">
                <div className="bg-gray-500 text-white font-bold rounded-t px-4 py-4 mb-2">
                  {message}
                </div>
              </div>
            )}

            <form onSubmit={handelsubmit}>
              <input
                ref={emailRef}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                required
              />

              <button
                disabled={loading}
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
              >
                Reset Password
              </button>

              <div className="text-grey-dark mt-6 text-center text-lg">
                <Link
                  to="/login"
                  className="no-underline border-b border-blue text-blue-600"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>

          <div className="text-grey-dark mt-6">
            Don't have an account?
            <Link
              to="/sighnup"
              className="no-underline border-b border-blue text-blue-600"
            >
              sighnup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
