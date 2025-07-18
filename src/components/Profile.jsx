import React, { useState, useEffect } from "react";
import crudService from "../../backend/appwrite/service/crud.service.js";
import { useAuth } from "../context/AuthContext";
import { ID } from "appwrite";

function Profile({ foods, setFoods }) {
  const { user } = useAuth();
  console.log(user);

  const handleLoggedOut = () => {
    if (!loggedIn) {
      alert("loggedOut, Please login to view");
      setTimeout(() => {
        window.location.href = "/login";
      }, 200);
    }
  };

  const loggedIn = !!user;
  const name = user?.name || "";
  const email = user?.email || "";
  const createdAt = user?.$createdAt ? new Date(user.$createdAt).toLocaleString() : "";

  useEffect(() => {
    if (!user) return;
    
    const fetchFoods = async () => {
      const response = await crudService.getFoods(user.$id);
      if (response) {
        setFoods(response.documents);
      }
    };
    fetchFoods();
  }, [user]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-lg">
          Profile
        </h1>
        {!loggedIn && (
          <button
            onClick={handleLoggedOut}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition font-semibold text-lg mb-4"
          >
            Please Login to view!
          </button>
        )}
        {loggedIn && (
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-blue-600">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <p className="text-xl font-semibold text-gray-800 mb-2">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            <p className="text-gray-500 text-lg">{email}</p>
            <p className="text-gray-500 text-lg">
              Account created on: {createdAt}
            </p>
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mt-5 mb-2 text-blue-600">
            Total foods added: {foods.length}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
