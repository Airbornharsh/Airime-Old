import { useState } from "react";
import SignContext from "./SignContext";

const SignProvider = (props) => {
  const [signned, setSignned] = useState(false);
  const [userUid, setUserUid] = useState();
  const [userPhotoUrl, setUserPhotoUrl] = useState("");

  const settingSignned = (data) => {
    setSignned(data);
  };

  const settingUserUid = (data) => {
    setUserUid(data);
  };

  const settingUserPhotoUrl = (data) => {
    setUserPhotoUrl(data);
  };

  const signContext = {
    signned: signned,
    userUid: userUid,
    userPhotoUrl: userPhotoUrl,
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
    setSignned: settingSignned,
    setUserUid: settingUserUid,
    setUserPhotoUrl: settingUserPhotoUrl,
  };

  return (
    <SignContext.Provider value={signContext}>
      {props.children}
    </SignContext.Provider>
  );
};

export default SignProvider;
