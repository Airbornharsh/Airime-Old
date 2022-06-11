import React, { useContext } from "react";
import AnimeTitleContext from "../Context/AnimeRender/AnimeRenderContext";
import classes from "./AnimeCard.module.css";

const AnimeCard = (props) => {
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

  return (
    <li onClick={AnimeRenderFn} className={classes.container}>
      <div className={classes.imgContainer}>
        <img src={props.imageUrl} alt=""></img>
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
    </li>
  );
};

export default AnimeCard;
