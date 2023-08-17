import * as React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authService } from "../config/Firebase";
import { useState, useEffect } from "react";

function Home() {
  const [email, setEmail] = useState<string | null | undefined>();
  const [myName, setMyName] = useState<string | null | undefined>();

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      setEmail(user?.email);
    });
  }, []);

  const onClick = () => {
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
      name : {myName}
      <br />
      email : {email}
      <br />
      <br />
      <button onClick={onClick}>로그아웃</button>
    </div>
  );
}
export default Home;
