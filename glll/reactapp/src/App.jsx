import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Form, Login, Feedback, Appointment, UserProfile, Loginadmin, Loginuser, Accueil, Admin, LawyerPage,  SocialAuthadmin, LawyerPageClient} from "./pages";

// import Layout from "./hocs/Layout";

export default function App() {
  return (
    <Router>
      {/* <Layout> */}
        <div>
          <Routes>
            <Route path="/form" exact element={<Form />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/feedback" exact element={<Feedback />} />
            <Route path="/appointment/id_client=:id_client/id_avocat=:id_avocat/" element={<Appointment />} />
            <Route path="/UserProfile" exact element={<UserProfile />} />
            <Route path="/Loginadmin" exact element={<Loginadmin />} />
            <Route path="/Loginuser" exact element={<Loginuser />} />
            <Route path="/Accueil"  exact element={<Accueil />} />
            <Route path="/Admin" exact element={<Admin />} />
             <Route exact path="/googlle" element={<SocialAuthadmin />} />
             <Route path="/LawyerPage" exact element={<LawyerPage />} />
             <Route path="/LawyerPageClient/:pk/:clientId/" element={<LawyerPageClient />} />
         
            
            
            
            
            
            
            
          </Routes>
        </div>
      {/* </Layout> */}
    </Router>
  );
}