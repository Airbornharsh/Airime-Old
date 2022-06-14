import { createContext } from "react";

const SignContext = createContext({
  signned: false,
  userUid: "",
  userPhotoUrl: "",
  firebaseConfig: {
    apiKey: "AIzaSyAeNbr_2vEyFkdScPaQyuKBGZE5btesvqk",
    authDomain: "airime.firebaseapp.com",
    databaseURL:
      "https://airime-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "airime",
    storageBucket: "airime.appspot.com",
    messagingSenderId: "492872885607",
    appId: "1:492872885607:web:1f095662cf7b3a0e293bc2",
    measurementId: "G-5F8CLBD4FD",
  },
  setSignned: () => {},
  setUserUid: () => {},
  setUserPhotoUrl: () => {},
});

export default SignContext;
