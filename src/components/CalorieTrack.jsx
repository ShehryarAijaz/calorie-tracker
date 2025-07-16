import React, { useState } from 'react'


function CalorieTrack() {

  const handleAddFood = () => {
    console.log("Add Food");
  }

  const handleRemoveFood = () => {
    console.log("Remove Food");
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Your Food Log</h2>
      <ul className="divide-y divide-gray-200">
            <button
            className="ml-50 bg-green-100 text-green-600 px-3 py-1 rounded hover:bg-green-200 transition"
            onClick={handleAddFood}
            >
              Add
            </button>
            <button
            className="ml-4 bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
            onClick={handleRemoveFood}
            >
              Remove
            </button>
      </ul>
    </div>
  )
}

export default CalorieTrack