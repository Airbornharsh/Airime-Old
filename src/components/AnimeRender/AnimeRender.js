import { createRef, useContext, useEffect } from "react";
import AnimeRenderContext from "../Helper/Context/AnimeRender/AnimeRenderContext";
import classes from "./AnimeRender.module.css";

const AnimeRender = () => {
  const containerRef = createRef();
  const AnimeRenderCtx = useContext(AnimeRenderContext);

  useEffect(() => {
    containerRef.current.style.display = AnimeRenderCtx.display;
    if (AnimeRenderCtx.httpRequest) {
      let query = `
      query ($id: Int) {
        Media(type: ANIME, id:$id) {
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
          characters(role:MAIN) {
            nodes {
              id
              name {
                first
                last
              }
              description
              image{
                large
                medium
              }
            }
          }
        }
      }
      `;

      let variables = {
        id: AnimeRenderCtx.id,
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
          AnimeRenderCtx.setHttpData(response.data.Media);
          console.log(response.data.Media);
        })
        .catch((err) => {
          alert("Error, check console");
        });
    }
  }, [AnimeRenderCtx,containerRef]);

  const CloseContainer = () => {
    AnimeRenderCtx.setDisplay("none");
    AnimeRenderCtx.setHttpData("");
    AnimeRenderCtx.setHttpRequest(false);
    AnimeRenderCtx.setId(null);
    containerRef.current.style.display = "none";
  };

  if (AnimeRenderCtx.httpData) {
    console.log(AnimeRenderCtx.httpData.title.english);
  }

  return (
    <div ref={containerRef} className={classes.container}>
      {AnimeRenderCtx.httpData ? (
        <div className={classes.contentContainer}>
          <div className={classes.container1}>
            <img
              src={AnimeRenderCtx.httpData.coverImage.extraLarge}
              alt="cover"
            />
            <h2>{AnimeRenderCtx.httpData.title.english}</h2>
            <p>{AnimeRenderCtx.httpData.description}</p>
          </div>
          <div className={classes.container2}></div>
        </div>
      ) : (
        ""
      )}
      <button onClick={CloseContainer} className={classes.closeContainer}>
        X
      </button>
    </div>
  );
};

export default AnimeRender;
