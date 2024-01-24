import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Form, Login, Feedback, Appointment, UserProfile, Loginadmin, Loginuser } from "./pages";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/loginadmin" element={<Loginadmin />} />
          <Route path="/loginuser" element={<Loginuser />} />
        </Routes>
      </div>
    </Router>
  );
}