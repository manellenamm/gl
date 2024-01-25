import React, { useCallback, useEffect, useState } from "react";

const { VITE_REACT_APP_GOOGLE_CLIENT_ID, VITE_REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT } = import.meta.env;

const Loginuser = () => {
  const [username, setUsername] = useState(localStorage.getItem('goggleFirstName'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user_goggle"));

  useEffect(() => {
    const storedUsername = localStorage.getItem("user_goggle");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    
    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = new URLSearchParams({
      response_type: "code",
      client_id: VITE_REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: `${VITE_REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT}/google`,
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

  return (
    <section>
      <div className="register">
        <div className="col-2">
          <img src="/images/sign.jpeg" alt="Sign In" />
        </div>
        <div className="col-1">
          <h2>Login user</h2>
          <span>Register and enjoy the service</span>

          {!isLoggedIn && (
            <button
              className="bg-white text-gray-800 font-bold py-2 px-4 border rounded shadow focus:outline-none mb-8 mb-4"
              onClick={openGoogleLoginPage}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                  {/* Ajoutez ici le contenu du SVG si nécessaire */}
                </svg>
                Sign in with Google
              </div>
            </button>
          )}

          {isLoggedIn && (
            <div className="text-center">
              <small className="text-primary-600">
                User is logged as: {username}
              </small>
              <br />
              <button
                onClick={handleLogout}
                className="bg-red-400 hover:bg-red-200 text-white font-semibold py-2 px-4 rounded mt-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Loginuser;