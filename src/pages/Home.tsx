import * as React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authService, dbService } from "../config/Firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { collection, addDoc, getDocs, query } from "firebase/firestore";

function Home() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [wordMeaning, setWordMeaning] = useState("");
  const [email, setEmail] = useState<string | null | undefined>();
  const [loading, setLoading] = useState(false);
  const [Nweets, setNweets] = useState([] as any);

  useEffect(() => {
    nweets();
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

  const nweets = async () => {
    const querySnapshot = await getDocs(collection(dbService, "users"));
    querySnapshot.forEach((doc) => {
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev: any) => [nweetObj, ...prev]);
    });
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "users"), {
        enWords: word,
        wordMeaning: wordMeaning,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setWord("");
    setWordMeaning("");
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
  const Testbtn = async () => {};
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
              <input type="submit" value="submit" />
            </form>
            <br />
          </div>
          <button onClick={Signout}>Sign out</button>
          <button onClick={Testbtn}>testbtn</button>

          <div>
            {Nweets.map(
              (nweets: {
                id: string;
                enWords: string;
                wordMeaning: string;
              }) => (
                <div key={nweets.id}>
                  {nweets.enWords} {nweets.wordMeaning}
                </div>
              )
            )}
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
export default Home;
