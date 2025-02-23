import React, { useState, useEffect } from "react";  // Import useState and useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"; // Don't forget to import axios

import "./App.css"; // Global styles
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Authentification/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Authentification/Resgister"; // Fixed the typo
import ResetPassword from "./pages/Authentification/ResetPassword";
import Passwordforget from "./pages/Authentification/Passwordforget";
import NotFound from "./pages/Exceptions/NotFound";
import Layout from "./layout/Layout";
import Head from "./components/head";

function App() {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //     axios.get("http://localhost:3000/")
  //         .then(response => setMessage(response.data.message))
  //         .catch(error => console.error("Erreur API:", error));
  // }, []);
  
  return (
    <>
      <Head /> 
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="/forget-password" element={<Passwordforget />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Page */}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
