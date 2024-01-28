import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import SearchSection from './search section/searchSection.jsx';
import TravelSection from './Travel section/travelSection.jsx';
import LawyersSection from './main lawyers/lawyersSection.jsx';
import LawyersLawyer from './main lawyers/lawyerslawyer.jsx';
import CommentsSection from './clients comments/commentsSection.jsx';

const BACKEND_API_URL = "http://127.0.0.1:8000";

function Accueil() {
  const location = useLocation();
  const navigate = useNavigate();

  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values.code;

    if (code) {
      googleLoginHandler(code);
    }
  }, [location.search]);

  const googleLoginHandler = (code) => {
    axios
      .get(`${BACKEND_API_URL}/api/auth/google/`, {
        params: { code: code },
      })
      .then((res) => {
        console.log("Google login response:", res);
        const clientId = res.data.id_client;
        setClientId(clientId);
      })
      .catch((err) => {
        console.error("Error during Google login:", err);
      });
  };

  return (
    <div>
      <SearchSection />
      <TravelSection />
      <LawyersSection />
      {clientId != null && <LawyersLawyer clientId={clientId} />}
    </div>
  );
}

export default Accueil;