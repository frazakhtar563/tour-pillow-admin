import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Home from "./Home";
import TourDetails from "./Pages/TourDetails/index";
import { Tours } from "./Pages";
import Login from "./Login";
function App() {
  return (
    <div className="App">


      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
           <Route path="/tours" element={
            <ProtectedRoute>
              <Tours />
            </ProtectedRoute>
          } />
          <Route path="/tour-details" element={
            <ProtectedRoute>
              <TourDetails />
            </ProtectedRoute>
          } />

          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

          {/* <Navigate to="/login" /> */}
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
