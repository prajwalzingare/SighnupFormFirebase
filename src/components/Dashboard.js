import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  function handlelogout() {}

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm items-center">
        <h5 className="text-gray-900 text-center text-[30px] leading-tight font-medium mb-2">
          Profile Details
        </h5>
        {error && (
          <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-4 mb-2">
              {error}
            </div>
          </div>
        )}
        <p className="text-gray-700 text-base mb-4">
          Email: {currentUser?.email}
        </p>

        <button
          onClick={handlelogout}
          type="button"
          className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
