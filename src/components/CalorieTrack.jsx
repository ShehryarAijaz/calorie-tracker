import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import crudService from "../../backend/appwrite/service/crud.service.js";
import { ID } from "appwrite";

function CalorieTrack({ foods, setFoods }) {
  const { user } = useAuth();
  
  const [food, setFood] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    servingSize: "",
    isCustom: "",
  });

  const handleAddFood = async () => {
    if (
      !food.name ||
      !food.calories ||
      !food.protein ||
      !food.carbs ||
      !food.fat ||
      !food.servingSize ||
      !food.isCustom
    ) {
      alert("Entries cannot be empty");
      return;
    }

    const response = await crudService.addFood({
      userId: user.$id,
      name: food.name,
      calories: parseInt(food.calories),
      protein: parseInt(food.protein),
      carbs: parseInt(food.carbs),
      fat: parseInt(food.fat),
      servingSize: String(food.servingSize),
      isCustom: food.isCustom?.toLowerCase() === "true",
    })
    if (response) {
      setFoods([...foods, response]);
    }

    setFood({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      servingSize: "",
      isCustom: "",
    });
  };

  useEffect(() => {
    const getCurrentFoods = async () => {
      if (!user) return;
      
      const response = await crudService.getFoods(user.$id)
      if (response) {
        setFoods(response.documents)
        console.log(response.documents)
      }
    }
    getCurrentFoods()
  }, [user])
  

  const loggedIn = !!user;

  if (!loggedIn) {
    return <div className="min-h-screen mt-10 flex flex-col items-center justify-center text-2xl font-bold">You're not <b className="text-red-500">logged in.</b> <a href="/login" className="text-blue-700 underline hover:text-blue-800 transition duration-300">Login</a> to continue</div>
  }

  return (
    <div className="min-h-screen mt-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 tracking-tight">
        Calorie Tracker
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8 w-full max-w-md flex flex-col items-center gap-4">
        <div className="w-full flex flex-col gap-3">
          <input
            value={food.name}
            onChange={(e) => setFood({ ...food, name: e.target.value })}
            type="text"
            placeholder="Food Name"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            value={food.calories}
            onChange={(e) => setFood({ ...food, calories: e.target.value })}
            type="number"
            placeholder="Calories"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            value={food.protein}
            onChange={(e) => setFood({ ...food, protein: e.target.value })}
            type="number"
            placeholder="Protein (g)"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            value={food.carbs}
            onChange={(e) => setFood({ ...food, carbs: e.target.value })}
            type="number"
            placeholder="Carbs (g)"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            value={food.fat}
            onChange={(e) => setFood({ ...food, fat: e.target.value })}
            type="number"
            placeholder="Fat (g)"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            value={food.servingSize}
            onChange={(e) => setFood({ ...food, servingSize: e.target.value })}
            type="number"
            placeholder="Serving Size (g)"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <span className="text-sm text-gray-500">Custom Entry</span>
          <select
            value={food.isCustom}
            onChange={(e) => setFood({ ...food, isCustom: e.target.value })}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md p-3 mt-2 transition"
          onClick={handleAddFood}
        >
          Add Food
        </button>
      </div>
      {foods.length > 0 && (
        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
            Your Foods
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-blue-100 text-blue-700">
                  <th className="py-3 px-4 text-left font-semibold">Name</th>
                  <th className="py-3 px-4 text-left font-semibold">Calories</th>
                  <th className="py-3 px-4 text-left font-semibold">Protein (g)</th>
                  <th className="py-3 px-4 text-left font-semibold">Carbs (g)</th>
                  <th className="py-3 px-4 text-left font-semibold">Fat (g)</th>
                  <th className="py-3 px-4 text-left font-semibold">Serving Size (g)</th>
                  <th className="py-3 px-4 text-left font-semibold">Is Custom</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-blue-50 transition"
                  >
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.calories}</td>
                    <td className="py-2 px-4">{item.protein}</td>
                    <td className="py-2 px-4">{item.carbs}</td>
                    <td className="py-2 px-4">{item.fat}</td>
                    <td className="py-2 px-4">{item.servingSize}</td>
                    <td className="py-2 px-4">{item.isCustom ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalorieTrack;
