import React from 'react'
import { useState } from 'react'
import authService from '../../backend/appwrite/service/auth.service.js'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!name || !email || !password) {
            setError("Please fill all the fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.createAccount(email, password, name);
            if (response) {
                const currentUser = await authService.getCurrentUser();
                console.log("User created successfully: ", currentUser);
                setIsLoading(false)
                navigate("/");
            } else { console.log("Error creating account"); }
        } catch (error) {
            console.log("Error creating account: ", error);
            setError(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded shadow p-8 w-full max-w-sm">
          <h1 className="text-3xl font-bold mb-2 text-center">Signup</h1>
          <p className="text-gray-500 mb-6 text-center">Please fill the form below to create an account</p>
          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none"
            />
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
              {isLoading ? "Signing up..." : "Signup"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <p className="text-blue-500 text-sm mt-2 text-center">
              Already have an account? <Link to="/login" className="underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    )
}

