import React, { useContext, useEffect, useState } from "react";
import AnimeCard from "../../../../Helper/AnimeCard/AnimeCard";
import GenreContext from "../../../../Helper/Context/Genre/GenreContext";

import classes from "./GenreRender.module.css";

const GenreRender = (props) => {
  const [genreRenderDatas, setGenreRenderDatas] = useState(null);
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(5);

  const GenreCtx = useContext(GenreContext);

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "167893f34dmshc16a73bcbe697e4p1d764bjsn28dcb14a62cf",
  //     "X-RapidAPI-Host": "jikan1.p.rapidapi.com",
  //   },
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     const link =
  //       "https://jikan1.p.rapidapi.com/genre/anime/" + props.genreId + "/1";

  //     fetch(link, options)
  //       .then((response) => response.json())
  //       .then((response) => {
  //         setGenreRenderDatas(response.anime);
  //       })
  //       .catch((err) => {
  //         setGenreRenderDatas(null);
  //         console.error(err);
  //       });
  //   }, 1);
  // }, [props.genre]);

  useEffect(() => {
    let query = `
    query ($page: Int,$perPage: Int,$genre:String) {
      Page(page: $page,perPage: $perPage) {
        media(type: ANIME, genre: $genre) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
          description
          bannerImage
          genres
        }
      }
    }
    
    `;

    let variables = {
      page: 1,
      perPage: 50,
      genre: GenreCtx.genre,
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
        setGenreRenderDatas(response.data.Page.media);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [GenreCtx.genre]);

  const leftClicked = () => {
    if (index > 0) {
      setIndex(index - 1);
      setNumber(number - 1);
    }
  };

  const rightClicked = () => {
    if (index < genreRenderDatas.length - 1) {
      setIndex(index + 1);
      setNumber(number + 1);
    }
  };

  return (
    <React.Fragment>
      {genreRenderDatas ? (
        <div className={classes.container}>
          <button onClick={leftClicked} className={classes.left}>
            {"<"}
          </button>
          <button onClick={rightClicked} className={classes.right}>
            {">"}
          </button>
          <h2>{GenreCtx.name}</h2>
          <ul>
            {genreRenderDatas.slice(index, number).map((genreRenderData) => {
              return (
                <AnimeCard
                  key={genreRenderData.id}
                  id={genreRenderData.id}
                  titleEnglish={genreRenderData.title.english}
                  titleRomaji = {genreRenderData.title.romaji}
                  imageUrl={genreRenderData.coverImage.large}
                  description={genreRenderData.description}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default GenreRender;
