import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import OTPVerify from "./components/OTPVerification";
import SignUp from "./components/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OTPVerify />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
