import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Form, Login, Feedback, Appointment, UserProfile, Loginadmin, Loginuser , SocialAuth} from "./pages";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/loginadmin" element={<Loginadmin />} />
        <Route path="/loginuser" element={<Loginuser />} />
        <Route exact path="/google" element={<SocialAuth />} />
      </Routes>
    </Router>
  );
}