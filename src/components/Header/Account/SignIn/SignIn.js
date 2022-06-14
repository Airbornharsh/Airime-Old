import firebase from "firebase/compat/app";
import { useContext } from "react";
import SignContext from "../../../Helper/Context/Sign/SignContext";
import SignInSvg from "../../../../assests/Svgs/Sign/SignIn.svg";

import classes from "./SignIn.module.css";

const SignIn = () => {
  const SignCtx = useContext(SignContext);

  const auth = firebase.auth();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      SignCtx.setUserUid(result.user.uid);
      SignCtx.setUserPhotoUrl(result.user.photoURL);
      SignCtx.setSignned(true);
    });
  };

  return (
    <span className={classes.signIn}>
      <img onClick={signInWithGoogle} src={SignInSvg} alt="Sign In"></img>;
    </span>
  );
};

export default SignIn;
