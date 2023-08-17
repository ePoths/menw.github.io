import * as React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { authService, updateUserProfile } from "../config/Firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

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
          updateUserProfile(name);
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

  const onSociaClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    if (name === "Google") {
      signInWithPopup(authService, googleProvider);
    } else if (name === "Github") {
      signInWithPopup(authService, githubProvider);
    }
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
        <button onClick={onSociaClick} name="Google">
          Google
        </button>
        <button onClick={onSociaClick} name="Github">
          Github
        </button>
      </div>
    </div>
  );
}

export default Auth;
