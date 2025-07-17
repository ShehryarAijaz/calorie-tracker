import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../backend/appwrite/service/auth.service";
import { useEffect } from "react";

function Home() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }
    fetchUser();
  })

  const navigate = useNavigate();

  const handleAddFood = () => {
    if (loggedIn) {
      navigate("/add-food");
    } else {
      navigate("/login");
    }
  };

  const handleViewProgress = () => {
    if (loggedIn) {
      navigate("/progress");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">
          {loggedIn ? "Welcome to Calorie Tracker" : "Please login to continue"}
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Track your daily nutrition, manage your meals, and reach your health
          goals with ease.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">
              Add Foods
            </h2>
            <p className="text-gray-500 text-center mb-4">
              Log your meals and snacks to keep track of your calories and
              macros.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleAddFood}
            >
              Add Food
            </button>
          </div>
          <div className="bg-green-50 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2 text-green-600">
              View Progress
            </h2>
            <p className="text-gray-500 text-center mb-4">
              See your daily and weekly nutrition stats and monitor your
              progress.
            </p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              onClick={handleViewProgress}
            >
              View Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
