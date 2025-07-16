import React, { useState, useEffect } from 'react'
import authService from '../../backend/appwrite/service/auth.service'

function Profile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(null);
    
    const handleLoggedOut = () => {
        if (!loggedIn) {
            alert('loggedOut, Please login to view');
            setTimeout(() => {
                window.location.href = '/login';
            }, 200);
        }
    }
    
    useEffect(() => {
        const fetchUser = async () => {
            const user = await authService.getCurrentUser();
            setLoggedIn(user);
            if (user) {
                setName(user.name);
                setEmail(user.email);
            }
        }
        fetchUser();
    }, []);

  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-lg">Profile</h1>
          {!loggedIn && (
            <button
              onClick={handleLoggedOut}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition font-semibold text-lg mb-4"
            >
              Please Login to view!
            </button>
          )}
          {loggedIn && (
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-blue-600">{name ? name.charAt(0).toUpperCase() : "U"}</span>
              </div>
              <p className="text-xl font-semibold text-gray-800 mb-2">{name}</p>
              <p className="text-gray-500 text-lg">{email}</p>
            </div>
          )}
        </div>
    </div>
  )
}

export default Profile