import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
  return (
    <>
      <Head />
      <Router>
        <Routes>
   
        <Route path="/" element={<Login />} />
        <Route
          path="/login"
          element={
       
              <Login />
        
          }
        />

        {/* Protected Routes (Wrapped in Layout) */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/reset/:token"
          element={
            
              <ResetPassword />
            
          }
        />
        <Route
          path="/forget-password"
          element={
            
              <Passwordforget />
     
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
        </Routes>
      </Router>
    </>
  );
}

export default App;
