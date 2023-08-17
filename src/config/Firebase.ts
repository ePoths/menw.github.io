// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { User, getAuth, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MESUREMENT_ID,
};

/** Prop name으로 이름 업데이트  */
export const updateUserProfile = (
  name: string,
  photoURL?: string,
  email?: string
) => {
  if (authService.currentUser) {
    const user: User = authService.currentUser;
    updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    })
      .then((user) => {
        console.log("Profile updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
