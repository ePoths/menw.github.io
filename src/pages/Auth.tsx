import * as React from "react";
import { useState } from "react";
import AuthStyle from "../style/AuthStyle.module.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { authService } from "../config/Firebase";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
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
        .then(() => {})
        .catch((error) => {
          errorMessageAlert(error.code);
        });
    } else {
      signInWithEmailAndPassword(authService, email, password)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          errorMessageAlert(error.code);
        });
    }
  };

  const toggleAccounBtn = () => {
    setNewAccount((prev) => !prev);
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
    <>
      <div className={AuthStyle.containal}>
        <div className={AuthStyle.contents}>
          <form onSubmit={onSubmit}>
            <h2 className={AuthStyle.title}>
              {newAccount ? "Create account" : "Sign In"}
            </h2>
            <input
              className={AuthStyle.emailInput}
              name="email"
              type="email"
              placeholder="  Email"
              required
              value={email}
              onChange={onChange}
            />

            <input
              className={AuthStyle.passwordInput}
              name="password"
              type="password"
              placeholder="  Password"
              required
              value={password}
              onChange={onChange}
            />
            <span className={AuthStyle.toggle} onClick={toggleAccounBtn}>
              {newAccount ? "Sign In" : "create new account"}
            </span>
            <span className={AuthStyle.errorMessage}>
              <p>{errorMessage}</p>
            </span>
            <input
              className={AuthStyle.submit}
              type="submit"
              value={newAccount ? "Create new account" : "Sign In"}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Auth;
