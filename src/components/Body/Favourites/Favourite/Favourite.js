import { useState, useEffect, Fragment, useContext, createRef } from "react";
import AnimeRenderContext from "../../../Helper/Context/AnimeRender/AnimeRenderContext";
import classes from "./Favourite.module.css";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";
import SignContext from "../../../Helper/Context/Sign/SignContext";

const Favourite = (props) => {
  const [favouriteData, setFavouriteData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const AnimeRenderCtx = useContext(AnimeRenderContext);
  const SignCtx = useContext(SignContext);
  const li = createRef();

  useEffect(() => {
    setIsLoading(true);
    let query = `
    query ($id: Int) {
      Media(type: ANIME, id:$id) {
        id
        title {
          romaji
          english
        }
        description
       coverImage{
        extraLarge
        large
        medium
       }
      }
    }
    `;

    let variables = {
      id: props.id,
    };

    const url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

    fetch(url, options)
      .then((response) => {
        return response.json().then((json) => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then((response) => {
        setFavouriteData(response.data.Media);
        setIsLoading(false);
        // favouriteCtx.setIsLoading(false);
      })
      .catch((err) => {
        // favouriteCtx.setIsLoading(false);
      });
  }, [props.id]);

  const RemoveItem = (data, id) => {
    let newData = [];
    data.forEach((element) => {
      if (element !== id) {
        newData.push(element);
      }
    });
    return newData;
  };

  const removeFavourite = () => {
    const app = initializeApp(SignCtx.firebaseConfig);
    const db = getFirestore(app);
    const docRef = doc(db, "Favourites", SignCtx.userUid);
    getDoc(docRef)
      .then((response) => {
        return response.data().favourite;
      })
      .then((data) => {
        setDoc(docRef, { favourite: RemoveItem(data, props.id) })
          .then(li.current.remove())
          .catch((err) => {
            console.log(err);
          });
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
  };

  const AnimeRenderFn = () => {
    AnimeRenderCtx.setId(props.id);
    AnimeRenderCtx.setDisplay("block");
    AnimeRenderCtx.setHttpRequest(true);
  };

  return (
    <li ref={li} className={classes.container}>
      {isLoading ? (
        <div className={classes.loadingContainer}>
          <span></span>
        </div>
      ) : (
        <Fragment>
          <span onClick={removeFavourite} className={classes.removeFavourite}>
            <button>X</button>
          </span>
          {favouriteData ? (
            <div className={classes.contentContainer}>
              <div
                onClick={AnimeRenderFn}
                className={classes.mainContentContainer}
              >
                <img
                  src={favouriteData.coverImage.large}
                  alt="FavouriteAnimeImage"
                />
                <h3>
                  {favouriteData.title.english
                    ? favouriteData.title.english
                    : favouriteData.title.romaji}
                </h3>
              </div>
            </div>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </li>
  );
};

export default Favourite;
