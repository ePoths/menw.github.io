import React, { useState } from "react";
import { authService } from "./config/Firebase";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
function App() {
  console.log(authService.currentUser);

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      {isLoggedIn ? <Home /> : <Auth />}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
