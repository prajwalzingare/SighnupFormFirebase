import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UpdateProfile() {
  //useref for values from input fields
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //sighnup function from useAuth()
  const { currentUser, updatePasswordFirebase, updateEmailFirebase } =
    useAuth();

  // console.log(currentUser);
  console.log(currentUser.email);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //for navigation after sighnup
  const navigate = useNavigate();
  //submit function for form submition
  function handleSubmit(event) {
    event.preventDefault();
    console.log("run");
    console.log(emailRef.current.value);
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      //it will exist out of function after returning error
      return setError("Password do not match");
    }

    const promises = [];

    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmailFirebase(emailRef.current.value));

      //Check if our email is not equal to our current email
      //if we've changed our email, I'll want to add that email by using (array.push)
    }

    if (passwordRef.current.value) {
      promises.push(updatePasswordFirebase(passwordRef.current.value));
    }

    Promise.all(promises)
      .then((a) => {
        console.log(a);
        //our .then will run everytime our promises execute
        navigate("/"); //redirecting to our home page
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        //our .finally will set our loading back to false and it runs if we either succeed or fail
        setLoading(false);
      });
  }
  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col font-serif">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-serif">
              Update Profile
            </h1>

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
                placeholder="Leave blank to keep the same"
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                ref={confirmPasswordRef}
                placeholder="Leave blank to keep the same"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1 text-lg"
              >
                Update
              </button>
            </form>
          </div>

          <div className="text-grey-dark text-xl mt-6">
            <Link
              to="/"
              className="no-underline border-b border-blue text-blue-600"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
