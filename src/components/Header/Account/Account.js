import SignIn from "./SignIn/SignIn";
import SignnedIn from "./SignnedIn/SignnedIn";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import classes from "./Account.module.css";
import { useContext } from "react";
import SignContext from "../../Helper/Context/Sign/SignContext";

const Account = () => {
  const SignCtx = useContext(SignContext);

  firebase.initializeApp(SignCtx.firebaseConfig);

  const auth = firebase.auth();

  const [user] = useAuthState(auth);

  console.log("SHIT");

  if (user) {
    SignCtx.setUserUid(user.uid);
    SignCtx.setUserPhotoUrl(user.photoURL);
  }

  return (
    <div className={classes.container}>{user ? <SignnedIn /> : <SignIn />}</div>
  );
};

export default Account;
