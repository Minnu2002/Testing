import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Addition from "./pages/Addition";
import Profile from "./pages/Profile";
import ApiInfo from "./pages/ApiInfo";
import Inventory from "./pages/Inventory";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoggedUser from "./pages/LoggedUser";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {localStorage.getItem("token") ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addition" element={<Addition />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Profile />} />
            <Route path="/apiInfo" element={<ApiInfo />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/loggedUser" element={<LoggedUser />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
