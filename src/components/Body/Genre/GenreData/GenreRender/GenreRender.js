import React, { useEffect, useState } from "react";
import AnimeCard from "../../../../Helper/AnimeCard/AnimeCard";

import classes from "./GenreRender.module.css";

const GenreRender = (props) => {
  const [genreRenderDatas, setGenreRenderDatas] = useState(null);
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(5);

  // setType(props.type);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "167893f34dmshc16a73bcbe697e4p1d764bjsn28dcb14a62cf",
      "X-RapidAPI-Host": "jikan1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const link =
        "https://jikan1.p.rapidapi.com/genre/anime/" + props.genreId + "/1";

      fetch(link, options)
        .then((response) => response.json())
        .then((response) => {
          setGenreRenderDatas(response.anime);
        })
        .catch((err) => {
          setGenreRenderDatas(null);
          console.error(err);
        });
    }, 1);
  }, [props.genre]);

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

  const AnimeRenderFn = (display, title) => {
    console.log(display);
    props.onAnimeRenderFn(display, title);
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
          <h2>{props.name}</h2>
          <ul>
            {genreRenderDatas.slice(index, number).map((genreRenderData) => {
              return (
                <AnimeCard
                  key={genreRenderData.title}
                  rank={genreRenderData.rank}
                  title={genreRenderData.title}
                  url={genreRenderData.url}
                  imageUrl={genreRenderData.image_url}
                  type={genreRenderData.type}
                  episodes={genreRenderData.episodes}
                  startDate={genreRenderData.start_date}
                  endDate={genreRenderData.end_date}
                  genres={genreRenderData.genres}
                  onAnimeRenderFn={AnimeRenderFn}
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
