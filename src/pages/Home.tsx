import * as React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authService } from "../config/Firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null | undefined>();
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState("");
  const [wordMeaning, setWordMeaning] = useState("");

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setLoading(true);
        setEmail(user?.email);
      } else {
        navigate("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Signout = () => {
    signOut(authService)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    if (name === "word") {
      setWord(value);
    } else if (name === "wordMeaning") {
      setWordMeaning(value);
    }
  };

  return (
    <div>
      {loading ? (
        <>
          <h2>Hello! {email}</h2>
          <div>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="word"
                value={word}
                onChange={onChange}
                placeholder="Can you write down an English word?"
                required
              />
              <br />
              <br />
              <input
                type="text"
                name="wordMeaning"
                value={wordMeaning}
                onChange={onChange}
                placeholder="Can you write down the meaning of the English word?"
                required
              />
              <br />
              <br />
              <input type="submit" value="EnWordsAndMeaning" />
            </form>
            <br />
          </div>
          <button onClick={Signout}>Sign out</button>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
export default Home;
