import React, { useEffect, useState } from "react";
import { authService } from "./config/Firebase";
import Auth from "./pages/Auth";
import { onAuthStateChanged } from "firebase/auth";

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
    <>
      {init ? (
        <div>
          {isLoggedIn ? <Auth /> : <Auth />}
          <footer>&copy; {new Date().getFullYear()}</footer>
        </div>
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
