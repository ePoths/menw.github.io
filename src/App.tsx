import React, { useEffect, useState } from "react";
import { authService } from "./config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>{init ? <>{isLoggedIn ? <Home /> : <Auth />}</> : "Initializing..."}</>
  );
}

export default App;
