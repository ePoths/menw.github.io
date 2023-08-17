import * as React from "react";
import { useState } from "react";

import TestStyle from "../style/TestStyle.module.css";

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
  const [newAccount, setNewAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageCheck, setErrorMessageCheck] = useState(false);

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
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage(error.message);
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
          setErrorMessageCheck(true);
        });
    } else {
      signInWithEmailAndPassword(authService, email, password)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          setErrorMessageCheck(true);
          errorMessageAlert(error.code);
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

  const errorMessageAlert = (errorCode: string) => {
    setErrorMessage(() => {
      switch (errorCode) {
        case "auth/user-not-found" || "auth/wrong-password":
          return "이메일 혹은 비밀번호가 일치하지 않습니다.";
        case "auth/email-already-in-use":
          return "이미 사용 중인 이메일입니다.";
        case "auth/weak-password":
          return "비밀번호는 6글자 이상이어야 합니다.";
        case "auth/network-request-failed":
          return "네트워크 연결에 실패 하였습니다.";
        case "auth/invalid-email":
          return "잘못된 이메일 형식입니다.";
        case "auth/internal-error":
          return "잘못된 요청입니다.";
        default:
          return "로그인에 실패 하였습니다.";
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className={TestStyle.testh2}>
          {newAccount ? "Create new account" : "Sign In"}
        </h2>

        {newAccount ? (
          <>
            <br />
            <input
              type="text"
              placeholder="Name"
              name="Name"
              value={name}
              onChange={onChange}
            />
            <br />
          </>
        ) : null}
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

      {/* 에러 메세지 표시 */}
      {errorMessageCheck ? <p>{errorMessage}</p> : null}

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
