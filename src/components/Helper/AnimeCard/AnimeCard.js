import React, { useContext } from "react";
import AnimeTitleContext from "../Context/AnimeRender/AnimeRenderContext";
import classes from "./AnimeCard.module.css";

const AnimeCard = (props) => {
  const AnimeRenderCtx = useContext(AnimeTitleContext);

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
        <h3>
          <a>{props.titleEnglish}</a>
        </h3>
        <h3>
          <a>({props.titleRomaji})</a>
        </h3>
        <p>{props.description}</p>
      </div>
    </li>
  );
};

export default AnimeCard;
