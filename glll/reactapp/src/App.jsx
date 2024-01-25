import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Form, Login, Feedback, Appointment, UserProfile, Loginadmin, Loginuser, SocialAuth , SocialAuthadmin} from "./pages";

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
          <Route exact path="/google" element={<SocialAuth />} />
          <Route exact path="/googlle" element={<SocialAuthadmin />} />
        </Routes>
      </div>
    </Router>
  );
}