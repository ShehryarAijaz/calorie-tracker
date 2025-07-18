import React, { createContext, useState, useEffect, useContext } from 'react'
import authService from '../../backend/appwrite/service/auth.service.js'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This useEffect hook is used to fetch the user from the database when the component is mounted. If the user is logged in, then the user will be set to the user object. Otherwise it will be null. It helps in retaining the context of the user when the user is logged in or out.
  useEffect(() => {
    // Define the async function to fetch the current user
    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        setUser(user)
      } else {
        setUser(null) // Explicitly set to null if no user is found
      }
    }
    fetchUser(); // <-- Call fetchUser() here so it runs when the component mounts
    // This ensures that the user state is initialized correctly on page load or refresh,
    // allowing components like Navbar to update their UI based on login/logout state.
  }, [])

  const login = async (email, password) => {
    const currentUser = await authService.login(email, password);
    setUser(currentUser)
  }

  const logout = async () => {
    await authService.logout();
    setUser(null)
  }

  return (
    // This AuthContext.Provider is used to provide the user, login and logout functions to the children components.
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

// This Auth is used to access the user, login and logout functions from the children components. You may ask what the children components are? They are the components that are wrapped in the AuthProvider component. This is a custom hook that is used to access the user, login and logout functions from the children components.
export const useAuth = () => useContext(AuthContext)