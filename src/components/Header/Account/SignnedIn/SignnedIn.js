import firebase from "firebase/compat/app";
import { useContext } from "react";
import FavouriteContext from "../../../Helper/Context/Favourite/FavouriteContext";
import SignContext from "../../../Helper/Context/Sign/SignContext";
import SignOutSvg from "../../../../assests/Svgs/Sign/SignOut.svg";
import FavouritesSvg from "../../../../assests/Svgs/Favourites/Favourites.svg";
import classes from "./SignnedIn.module.css";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const SignnedIn = () => {
  const SignCtx = useContext(SignContext);
  const favouriteCtx = useContext(FavouriteContext);

  const auth = firebase.auth();

  const signOut = () => {
    SignCtx.setSignned(false);
    SignCtx.setUserUid(null);
    SignCtx.setUserPhotoUrl(null);
    auth.signOut();
  };

  const displayFavourite = () => {
    if (SignCtx.userUid) {
      favouriteCtx.setIsLoading(true);
      const app = initializeApp(SignCtx.firebaseConfig);
      const db = getFirestore(app);
      const docRef = doc(db, "Favourites", SignCtx.userUid);
      getDoc(docRef)
        .then((snapshot) => {
          favouriteCtx.setIsLoading(false);
          favouriteCtx.setData(snapshot.data().favourite);
          favouriteCtx.setDisplay(true);
        })
        .catch((err) => {
        });
    } else {
      alert("please Login");
    }
  };

  return (
    <div className={classes.conatainer}>
      <span className={classes.profileLogo}>
        <img src={SignCtx.userPhotoUrl} alt="Profile"></img>
      </span>
      <span className={classes.favourites}>
        <img
          onClick={displayFavourite}
          src={FavouritesSvg}
          alt="Sign Out"
        ></img>
      </span>
      {auth.currentUser ? (
        <span className={classes.signOut}>
          <img onClick={signOut} src={SignOutSvg} alt="Sign Out"></img>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default SignnedIn;
