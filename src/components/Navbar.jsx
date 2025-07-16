import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../backend/appwrite/service/auth.service'

function Navbar() {

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await authService.getCurrentUser();
            setLoggedIn(user);
        }
        fetchUser();
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate("/login");
    }

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between w-full sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {/* Logo Placeholder */}
            <span>Logo</span>
          </div>
          <span className="ml-2 text-2xl font-bold text-blue-700">Calorie Tracker</span>
        </button>
      </div>
      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        {loggedIn && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            onClick={() => navigate('/add-food')}
          >
            Add Food
          </button>
        )}
        {loggedIn && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
          onClick={() => navigate('/progress')}
        >
          View Progress
        </button>
        )}
        {loggedIn && (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
          onClick={() => navigate('/account')}
        >
          View Account
        </button>
        )}
        {loggedIn && (
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          onClick={handleLogout}
        >
          Logout
        </button>
        )}
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </nav>
  )
}

export default Navbar