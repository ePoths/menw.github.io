import * as React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { authService } from "../config/Firebase";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAccount) {
      createUserWithEmailAndPassword(authService, email, password)
        .then(() => {
          console.log("Success");
          setNewAccount(false);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setNewAccount(false);
        });
    } else {
      signInWithEmailAndPassword(authService, email, password)
        .then(() => {
          console.log("Success");
        })
        .catch((err) => {
          console.log(
            "Error code : ",
            err.code,
            "Error message :",
            err.message
          );
        });
    }
  };
  const toggleAccounBtn = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>{newAccount ? "Create new account" : "Sign In"}</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create new account" : "Sign In"}
        />
      </form>
      <p>{errorMessage}</p>
      <div>
        <button onClick={toggleAccounBtn}>
          {newAccount ? "Sign In" : "Create new account"}
        </button>
        <button>Google</button>
        <button>Github</button>
      </div>
    </div>
  );
}

export default Auth;
