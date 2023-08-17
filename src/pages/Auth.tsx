import * as React from "react";
import { useState } from "react";

function Auth() {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      console.log(value);
      setEmail(value);
    } else if (name === "password") {
      console.log(value);
      setPassword(value);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
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
        <input type="submit" value={"log in"} />
      </form>
      <div>
        <button>Google</button>
        <button>Github</button>
      </div>
    </div>
  );
}

export default Auth;
