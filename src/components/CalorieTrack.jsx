import React, { useState } from 'react';
import { ID } from 'appwrite';

function CalorieTrack() {
  const [food, setFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    servingSize: '',
    isCustom: ''
  });

  const [foods, setFoods] = useState([]);

  const handleAddFood = () => {
    setFoods([...foods, food]);
    setFood({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      servingSize: '',
      isCustom: ''
    });
  };

  // TODO: Implement workflow to post foods to backend
  // Steps:
  // 1. Import authService from the appropriate service file.
  // 2. Create an async function postFood.
  // 3. Use authService.uploadDocument("foods", foods) to upload the foods array.
  // 4. Handle success and error cases, and provide user feedback as needed.
  // Example:
  // const postFood = async () => {
  //   try {
  //     const add = await authService.uploadDocument("foods", foods);
  //     console.log(add);
  //     // Optionally clear foods or show success message
  //   } catch (error) {
  //     console.error("Error uploading foods:", error);
  //     // Optionally show error message to user
  //   }
  // }
  // }

  console.log(foods);
  

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 tracking-tight">Calorie Tracker</h1>
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
          <input
            value={food.isCustom}
            onChange={(e) => setFood({ ...food, isCustom: e.target.value })}
            type="text"
            placeholder="Is Custom"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
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
          <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">Your Foods</h2>
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
                  <tr key={index} className="border-t hover:bg-blue-50 transition">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.calories}</td>
                    <td className="py-2 px-4">{item.protein}</td>
                    <td className="py-2 px-4">{item.carbs}</td>
                    <td className="py-2 px-4">{item.fat}</td>
                    <td className="py-2 px-4">{item.servingSize}</td>
                    <td className="py-2 px-4">{item.isCustom}</td>
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
