import React from "react";
import check from "../../check";
import classes from "./AnimeCard.module.css";
import AnimeRender from "../../AnimeRender/AnimeRender";

const AnimeCard = (props) => {
  let temp;
  if (props.endDate) {
    temp = "(" + props.startDate + " - " + props.endDate + ")";
  } else {
    if (props.startDate) {
      temp = "(" + props.startDate + " - Continuing)";
    } else {
      temp = "";
    }
  }

  const AnimeRenderFn = () => {
    props.onAnimeRenderFn("block",props.title);
  };

  return (
    <li onClick={AnimeRenderFn} className={classes.container}>
      <div className={classes.imgContainer}>
        <img src={props.imageUrl} alt=""></img>
      </div>
      <div className={classes.dataContainer}>
        <h3>
          <a>
            {props.rank}. {props.title}
          </a>
        </h3>
        {temp ? <span className={classes.date}>{temp}</span> : ""}
      </div>
    </li>
  );
};

export default AnimeCard;
