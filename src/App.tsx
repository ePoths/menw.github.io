import React, { useEffect, useState } from "react";
import { authService } from "./config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        navigate("/home");
      } else {
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <div>
          <Auth />
          <br />
          <footer>&copy; {new Date().getFullYear()}</footer>
        </div>
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
