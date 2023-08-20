import * as React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authService, dbService } from "../config/Firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeStyle from "../style/HomeStyle.module.css";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function Home() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [wordMeaning, setWordMeaning] = useState("");
  const [email, setEmail] = useState<string | null | undefined>();
  const [loading, setLoading] = useState(false);
  const [Nweets, setEnWords] = useState([] as any);

  useEffect(() => {
    const q = query(
      collection(dbService, "users"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const words = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEnWords(words);
    });

    onAuthStateChanged(authService, (user) => {
      if (user) {
        setEmail(user.email?.split("@")[0]);
        setLoading(true);
      } else {
        navigate("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로그아웃
  const Signout = () => {
    signOut(authService)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 생성하기
    try {
      await addDoc(collection(dbService, "users"), {
        enWords: word,
        wordMeaning: wordMeaning,
        createdAt: Date.now(),
      });
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
  return (
    <div>
      {loading ? (
        <>
          <div className={HomeStyle.containal}>
            <h2 className={HomeStyle.mainTitle}>Hello! {email}</h2>
            <div className={HomeStyle.contents}>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  name="word"
                  value={word}
                  onChange={onChange}
                  className={HomeStyle.enWordInput}
                  placeholder="   단어"
                  required
                />
                <input
                  className={HomeStyle.wordMeaningInput}
                  type="text"
                  name="wordMeaning"
                  value={wordMeaning}
                  onChange={onChange}
                  placeholder="   단어 뜻"
                  required
                />
                <input className={HomeStyle.submit} type="submit" value="Add" />
              </form>
            </div>

            <hr className={HomeStyle.hr} />
            <div className={HomeStyle.WordContents}>
              <h3 className={HomeStyle.contentTile}>단어</h3>
              {Nweets.map(
                (nweets: {
                  id: string;
                  enWords: string;
                  wordMeaning: string;
                }) => (
                  <div key={nweets.id} className={HomeStyle.WordsBox}>
                    <div className={HomeStyle.Words}>
                      <span className={HomeStyle.enWords}>
                        {nweets.enWords}{" "}
                      </span>
                      <span>|</span>
                      <span className={HomeStyle.enMeaning}>
                        {nweets.wordMeaning}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className={HomeStyle.SignOut}>
              <button className={HomeStyle.SignOutBtn} onClick={Signout}>
                Sign out
              </button>
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
export default Home;
