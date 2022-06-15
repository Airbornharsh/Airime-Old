import React, { useContext } from "react";
import AnimeTitleContext from "../Context/AnimeRender/AnimeRenderContext";
import FavouriteSvg from "../../../assests/Svgs/Favourites/Favourite.svg";
import classes from "./AnimeCard.module.css";
import SignContext from "../Context/Sign/SignContext";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

const AnimeCard = (props) => {
  const SignCtx = useContext(SignContext);
  const AnimeRenderCtx = useContext(AnimeTitleContext);

  let startDateData, endDateData;

  if (props.startDate) {
    startDateData =
      props.startDate.day +
      "/" +
      props.startDate.month +
      "/" +
      props.startDate.year;
  }

  if (props.endDate) {
    endDateData =
      props.endDate.day + "/" + props.endDate.month + "/" + props.endDate.year;
  }

  const AnimeRenderFn = () => {
    AnimeRenderCtx.setId(props.id);
    AnimeRenderCtx.setDisplay("block");
    AnimeRenderCtx.setHttpRequest(true);
  };

  const CheckExisted = (data, id) => {
    let value = false;
    data.forEach((element) => {
      if (element === id) {
        value = true;
      }
    });
    return value;
  };

  const addFavourite = () => {
    if (SignCtx.userUid) {
      const app = initializeApp(SignCtx.firebaseConfig);
      const db = getFirestore(app);
      const docRef = doc(db, "Favourites", SignCtx.userUid);
      getDoc(docRef)
        .then((response) => {
          return response.data().favourite;
        })
        .then((data) => {
          if (!CheckExisted(data, props.id)) {
            setDoc(docRef, { favourite: [...data, props.id] }).catch((err) => {
              console.log(err);
            });
          }
        })
        .catch(() => {
          setDoc(docRef, { favourite: [props.id] })
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      alert("please Login");
    }
  };

  return (
    <li className={classes.mainContainer}>
      <span className={classes.addFavourite}>
        <img onClick={addFavourite} src={FavouriteSvg} alt="favourite"></img>
      </span>
      <div onClick={AnimeRenderFn} className={classes.container}>
        <div className={classes.imgContainer}>
          <img src={props.imageUrl} alt="" />
        </div>
        <div className={classes.dataContainer}>
          <h3>{props.titleEnglish}</h3>
          <h3>({props.titleRomaji})</h3>
          {props.startDate && props.endDate ? (
            <div className={classes.date}>
              {props.startDate ? (
                <div className={classes.startDate}>
                  Started on:
                  <p>{startDateData}</p>
                </div>
              ) : (
                ""
              )}
              {props.endDate ? (
                <div className={classes.endDate}>
                  Completed on:
                  <p>{endDateData}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {props.description ? (
            <p className={classes.description}>{props.description}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
};

export default AnimeCard;
