import * as React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authService } from "../config/Firebase";
function Home() {
  const onClick = () => {
    onAuthStateChanged(authService, (user) => {
      console.log(user?.email);
    });
    signOut(authService)
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      Home
      <button onClick={onClick}>test</button>
    </div>
  );
}
export default Home;
