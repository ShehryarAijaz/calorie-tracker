import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

function Navbar() {

  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout()
    navigate("/login");
  }

  const loggedIn = !!user; // !!user converts the user object to a boolean value. If the user is logged in, it will return true. Otherwise it will return false.

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
        {!loggedIn && (
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        )}
        {!loggedIn && (
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
            onClick={() => navigate('/signup')}
          >
            Signup
          </button>
        )}
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
          onClick={toggleTheme}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  )
}

export default Navbar