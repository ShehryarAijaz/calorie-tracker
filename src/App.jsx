import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import CalorieTrack from "./components/CalorieTrack";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-food" element={<CalorieTrack />} />
          <Route path="/account" element={<Profile />} />
          {/* <Route path="/progress" element={<Progress />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
