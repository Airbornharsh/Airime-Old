import { useState, useEffect, Fragment, useContext } from "react";
import AnimeRenderContext from "../../../Helper/Context/AnimeRender/AnimeRenderContext";
import classes from "./Favourite.module.css";

const Favourite = (props) => {
  const [favouriteData, setFavouriteData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const AnimeRenderCtx = useContext(AnimeRenderContext);

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

  const AnimeRenderFn = () => {
    AnimeRenderCtx.setId(props.id);
    AnimeRenderCtx.setDisplay("block");
    AnimeRenderCtx.setHttpRequest(true);
  };

  return (
    <li className={classes.container}>
      {isLoading ? (
        <div className={classes.loadingContainer}>
          <span></span>
        </div>
      ) : (
        <Fragment>
          {favouriteData ? (
            <div onClick={AnimeRenderFn} className={classes.contentContainer}>
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
          ) : (
            ""
          )}
        </Fragment>
      )}
    </li>
  );
};

export default Favourite;
