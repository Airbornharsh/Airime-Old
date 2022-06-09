import { createRef, useEffect } from "react";
import classes from "./AnimeRender.module.css";

const AnimeRender = (props) => {
  const containerRef = createRef();

  useEffect(() => {
    containerRef.current.style.display = props.display;
  }, [props.display]);

  const CloseContainer = () => {
    props.onAnimeRenderCloseContainer("none");
    containerRef.current.style.display = "none";
  };

  return (
    <div ref={containerRef} className={classes.container}>
      <div className={classes.contentContainer}>
        <div className={classes.container1}></div>
        <div className={classes.container2}></div>
      </div>
      <button onClick={CloseContainer} className={classes.closeContainer}>
        X
      </button>
    </div>
  );
};

export default AnimeRender;
