import React, { useState } from 'react'
import authService from '../../backend/appwrite/service/auth.service'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(false)
        setError(null)

        if (!email || !password) {
            setError("Please fill all the fields");
            setIsLoading(false);
            return;
        }

        try {
          await login(email, password)
          setIsLoading(false)
          navigate('/')
        } catch (error) {
            console.log("Error logging in: ", error);
            setError(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded shadow p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-2 text-center">Login</h1>
        <p className="text-gray-500 mb-6 text-center">Please fill the form below to login</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none"
          />
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-700 transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="text-blue-500 text-sm mt-2 text-center">
            Don't have an account? <Link to="/signup" className="underline">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login