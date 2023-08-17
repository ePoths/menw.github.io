import * as React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authService } from "../config/Firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null | undefined>();
  const [myName, setMyName] = useState<string | null | undefined>();
  const [test, setTest] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user?.displayName) {
        setTest(true);
        setEmail(user?.email);
        setMyName(user?.displayName);
      } else {
        navigate("/");
      }
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
      {test ? (
        <div>
          <p>name : {myName}</p> <p>email : {email}</p>
          <button onClick={onClick}>Sign out</button>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
export default Home;
