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
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Signup</h1>
        <p className="text-gray-500">Please fill the form below to create an account</p>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-500">{error}</p>
            <p className="text-blue-500">
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <button disabled={isLoading} type="submit">
                {isLoading ? "Signing up..." : "Signup"}
            </button>
        </form>
    </div>
  )
}

