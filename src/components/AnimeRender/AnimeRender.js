import { Fragment, useContext, useEffect, useState } from "react";
import AnimeRenderContext from "../Helper/Context/AnimeRender/AnimeRenderContext";
import AnimeRenderHttp from "./AnimeRenderHttp";
import classes from "./AnimeRender.module.css";

const AnimeRender = () => {
  const [httpData, setHttpData] = useState("");
  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const AnimeRenderCtx = useContext(AnimeRenderContext);

  // useEffect(() => {
  //   if (AnimeRenderCtx.httpRequest) {
  //     setIsLoading(true);
  //     let query = `
  //     query ($id: Int) {
  //       Media(type: ANIME, id:$id) {
  //         title {
  //           romaji
  //           english
  //         }
  //         description
  //        coverImage{
  //         extraLarge
  //         large
  //         medium
  //        }
  //         characters(role:MAIN) {
  //           nodes {
  //             id
  //             name {
  //               first
  //               last
  //             }
  //             description
  //             image{
  //               large
  //               medium
  //             }
  //           }
  //         }
  //       }
  //     }
  //     `;

  //     let variables = {
  //       id: AnimeRenderCtx.id,
  //     };

  //     const url = "https://graphql.anilist.co",
  //       options = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         body: JSON.stringify({
  //           query: query,
  //           variables: variables,
  //         }),
  //       };

  //     setTimeout(() => {
  //       fetch(url, options)
  //         .then((response) => {
  //           return response.json().then((json) => {
  //             return response.ok ? json : Promise.reject(json);
  //           });
  //         })
  //         .then((response) => {
  //           setHttpData(response.data.Media);
  //           setIsLoading(false);
  //           setDisplay(true);
  //         })
  //         .catch((err) => {
  //           alert("Error, check console");
  //           setIsLoading(false);
  //         });
  //     }, 5);
  //   }
  // }, [AnimeRenderCtx.httpRequest, AnimeRenderCtx.id]);

  useEffect(() => {
    AnimeRenderHttp(
      AnimeRenderCtx.httpRequest,
      AnimeRenderCtx.id,
      setIsLoading,
      setHttpData,
      setDisplay
    );
  }, [AnimeRenderCtx.httpRequest, AnimeRenderCtx.id]);

  const CloseContainer = () => {
    AnimeRenderCtx.setHttpRequest(false);
    AnimeRenderCtx.setId(null);
    setDisplay(false);
  };

  if (AnimeRenderCtx.httpData) {
    console.log(AnimeRenderCtx.httpData.title.english);
  }

  return (
    <Fragment>
      {isLoading ? (
        <div className={classes.loadingContainer}>
          <span></span>
        </div>
      ) : (
        <div>
          {display ? (
            <div className={classes.container}>
              {httpData ? (
                <div className={classes.contentContainer}>
                  <div className={classes.container1}>
                    <img src={httpData.coverImage.extraLarge} alt="cover" />
                    <h2>{httpData.title.english}</h2>
                    <p>{httpData.description}</p>
                  </div>
                  <div className={classes.container2}></div>
                </div>
              ) : (
                ""
              )}
              <button
                onClick={CloseContainer}
                className={classes.closeContainer}
              >
                X
              </button>
            </div>
          ) : (
            <div className={classes.none}></div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default AnimeRender;
