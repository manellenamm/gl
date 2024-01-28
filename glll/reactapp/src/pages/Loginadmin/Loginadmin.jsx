import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Loginadmin.css";
const { VITE_REACT_APP_GOOGLE_CLIENT_ID, VITE_REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT } = import.meta.env;
const Loginadmin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const storedUsername = localStorage.getItem("user_google");
  const [username, setUsername] = useState(storedUsername || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUsername);

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = new URLSearchParams({
      response_type: "code",
      client_id: VITE_REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: `${VITE_REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT}/googlle`,
      prompt: "select_account",
      access_type: "offline",
      scope,
    });

    const url = `${googleAuthUrl}?${params}`;

    window.location.href = url;
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsername("");
    setIsLoggedIn(false);
  };

  const handleFormSubmit = (data) => {
    openGoogleLoginPage();

    fetch('http://127.0.0.1:8000/api/auth/googlle/') 
      .then(response => response.json())
      .then(data => {
        console.log("API response data:", data);

        const receivedUsername = data.user.username;
        console.log("Received username:", receivedUsername);

        localStorage.setItem("user_google", receivedUsername);
        setUsername(receivedUsername);
        setIsLoggedIn(true);
        navigate("/Admin");
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Already logged in, redirecting...");
      navigate("/Admin");
    } else {
      console.log("Not logged in yet");
    }
  }, [isLoggedIn, navigate]);

  return (
    <section>
      <div className="register">
        <div className="col-2">
          <img src="/images/sign.jpeg" alt="Sign In" />
        </div>
        <div className="col-1">
          <h2>Login Admin</h2>
          <span>Register and enjoy the service</span>

          {!isLoggedIn && (
            <form
              id="form"
              className="flex flex-col"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email Address"
              />
              <input type="password" {...register("password")} placeholder="Password" />

              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 border rounded shadow focus:outline-none mb-8 mb-4"
                type="submit"
              >
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                    {/* Add SVG content here if necessary */}
                  </svg>
                  Continue with Google
                </div>
              </button>
            </form>
          )}

          {username ? (
            <div className="text-center">
              <small className="text-primary-600">User is logged as: {username}</small>
              <br />
              <button onClick={handleLogout} className="bg-red-400 hover:bg-red-200 text-white font-semibold py-2 px-4 rounded mt-2">
                Logout
              </button>
            </div>
          ) : (
            <small className="text-primary-600">Ops not Logged in yet</small>
          )}
        </div>
      </div>
    </section>
  );
};
export default Loginadmin;