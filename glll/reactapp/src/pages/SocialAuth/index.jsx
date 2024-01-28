import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import "./index.css";

const BACKEND_API_URL = "http://127.0.0.1:8000";

const SocialAuth = () => {
  const location = useLocation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values.code ? values.code : null;

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
        console.log("res", res);
        localStorage.setItem("goggleFirstName", res.data.user.first_name);
      })
      .catch((err) => {
        console.log("error", err);
        // Handle error as needed
      });
  };

  return (
    <div className="loading-icon-container">
      <div className="loading-icon">
        <div className="loading-icon__circle loading-icon__circle--first"></div>
        <div className="loading-icon__circle loading-icon__circle--second"></div>
        <div className="loading-icon__circle loading-icon__circle--third"></div>
        <div className="loading-icon__circle loading-icon__circle--fourth"></div>
      </div>
      <small className=" text-center mr-2">Just a moment</small>
    </div>
  );
};

export default SocialAuth;