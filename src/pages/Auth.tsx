import * as React from "react";
import { useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { authService } from "../config/Firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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
    } else if (name === "Name") {
      setName(value);
    }
  };

  const updateUserProfile = (name: string) => {
    if (authService.currentUser) {
      const user: User = authService.currentUser;
      updateProfile(user, {
        displayName: name,
      })
        .then((user) => {
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newAccount) {
      createUserWithEmailAndPassword(authService, email, password)
        .then(() => {
          updateUserProfile(name);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          // setNewAccount(false);
        });
    } else {
      signInWithEmailAndPassword(authService, email, password)
        .then(() => {
          console.log("Success");
          navigate("/home");
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
        {newAccount ? (
          <input
            type="text"
            placeholder="Name"
            name="Name"
            value={name}
            onChange={onChange}
          />
        ) : null}
        <br />
        <br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <br />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <br />
        <br />
        <input
          type="submit"
          value={newAccount ? "Create new account" : "Sign In"}
        />
      </form>

      <br />
      <p>{errorMessage}</p>
      <span onClick={toggleAccounBtn}>
        {newAccount ? "Sign In" : "Create new account"}
      </span>
      <br />
      <br />
      <div>
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
