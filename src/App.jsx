import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import CalorieTrack from "./components/CalorieTrack";
import TalkToAI from "./components/TalkToAI";
import Progress from "./components/Progress";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {

  const [foods, setFoods] = useState([])

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-food" element={<CalorieTrack foods={foods} setFoods={setFoods} />} />
          <Route path="/account" element={<Profile foods={foods} setFoods={setFoods} />} />
          <Route path="/ai-companion" element={<TalkToAI foods={foods} setFoods={setFoods} />} />
          <Route path="/progress" element={<Progress foods={foods} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
