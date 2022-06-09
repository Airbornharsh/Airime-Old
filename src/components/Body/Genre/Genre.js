import React, { useEffect, useState } from "react";
import GenreCard from "../../Helper/AnimeCard/GenreCard/GenreCard";
import GenreDatas from "./GenreData/GenreDatas";

import classes from "./Genre.module.css";

const Genre = (props) => {
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(5);
  // setType(props.type);

  const leftClicked = () => {
    if (index > 0) {
      setIndex(index - 1);
      setNumber(number - 1);
    }
  };

  const rightClicked = () => {
    if (index < GenreDatas.length - 1) {
      setIndex(index + 1);
      setNumber(number + 1);
    }
  };

  const Explored = (data) => {
    props.onExplored(data);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <button onClick={leftClicked} className={classes.left}>
          {"<"}
        </button>
        <button onClick={rightClicked} className={classes.right}>
          {">"}
        </button>
        <h2>Genre</h2>
        <ul>
          {GenreDatas.slice(index, number).map((GenreData,index) => {
            return (
              <GenreCard
                key={index}
                genreId={index+1}
                name={GenreData.name}
                genre={GenreData.genre}
                onExplored={Explored}
              />
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Genre;
