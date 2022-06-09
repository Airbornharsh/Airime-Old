import React, { useEffect, useState } from "react";
import AnimeCard from "../../../Helper/AnimeCard/AnimeCard";

import LeftBt from "../../../../assests/Svgs/Buttons/LeftBt.js";
import RightBt from "../../../../assests/Svgs/Buttons/RightBt.js";

import classes from "./TopAnime.module.css";

const TopAnime = (props) => {
  const [topAnimeDatas, setTopAnimeDatas] = useState([]);
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(5);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "jikan1.p.rapidapi.com",
      "X-RapidAPI-Key": "40c256fd36msh733f84981819a1fp108278jsn4e817c0e643f",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jikan1.p.rapidapi.com/top/anime/1/upcoming", options)
        .then((response) => response.json())
        .then((response) => {
          setTopAnimeDatas(response.top);
        })
        .catch((err) => {
          setTopAnimeDatas(null);
        });
    }, 1);
  }, []);

  const leftClicked = () => {
    if (index > 0) {
      setIndex(index - 1);
      setNumber(number - 1);
    }
  };

  const rightClicked = () => {
    if (index < topAnimeDatas.length - 1) {
      setIndex(index + 1);
      setNumber(number + 1);
    }
  };

  const AnimeRenderFn = (display,title) => {
    props.onAnimeRenderFn(display,title);
  };

  return (
    <React.Fragment>
      {topAnimeDatas ? (
        <div className={classes.container}>
          <button onClick={leftClicked} className={classes.left}>
            {"<"}
          </button>
          <button onClick={rightClicked} className={classes.right}>
            {">"}
          </button>
          {/* <span className={classes.left}>
            <LeftBt onclick={leftClicked} />
          </span>
          <span className={classes.right}>
            <RightBt onclick={rightClicked} />
          </span> */}
          <h2>Top Anime</h2>
          <ul>
            {topAnimeDatas.slice(index, number).map((topAnimeEditedData) => {
              return (
                <AnimeCard
                  key={topAnimeEditedData.title}
                  rank={topAnimeEditedData.rank}
                  title={topAnimeEditedData.title}
                  url={topAnimeEditedData.url}
                  imageUrl={topAnimeEditedData.image_url}
                  type={topAnimeEditedData.type}
                  episodes={topAnimeEditedData.episodes}
                  startDate={topAnimeEditedData.start_date}
                  endDate={topAnimeEditedData.end_date}
                  onAnimeRenderFn = {AnimeRenderFn}
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

export default TopAnime;
