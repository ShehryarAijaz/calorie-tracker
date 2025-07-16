import React, { useState } from 'react'
import authService from '../../backend/appwrite/service/auth.service'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading
        setError

        if (!email || !password) {
            setError("Please fill all the fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.login(email, password)
            if (response) {
                const currentUser = await authService.getCurrentUser();
                console.log("User logged in successfully: ", currentUser);
                setIsLoading(false);
                navigate('/')
            } else {
                console.log("Error logging in");
            }
        } catch (error) {
            console.log("Error logging in: ", error);
            setError(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-gray-500">Please fill the form below to login</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={isLoading} type="submit">
                {isLoading ? "Logging in..." : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login