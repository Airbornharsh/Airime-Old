import React, { useState } from "react";
import AnimeRender from "../AnimeRender/AnimeRender";
import classes from "./Body.module.css";
import Genre from "./Genre/Genre";
import GenreRender from "./Genre/GenreData/GenreRender/GenreRender";
import SearchResults from "./SearchResults/SearchResults";
import Top from "./Top/Top";

const Body = (props) => {
  const [exploredData, setExploredData] = useState("");
  const [animeRenderDisplay, setAnimeRenderDisplay] = useState("none");
  const [animeRenderTitle, setAnimeRenderTitle] = useState("");

  const Explored = (data) => {
    setExploredData(data);
    console.log(data);
  };

  const AnimeRenderFn = (display,title) => {
    setAnimeRenderTitle(title);
    setAnimeRenderDisplay(display);
  };

  const AnimeRenderCloseContainer = (display) => {
    setAnimeRenderTitle("");
    setAnimeRenderDisplay(display);
  };

  return (
    <React.StrictMode>
      <div className={classes.container}>
        {props.search ? (
          <SearchResults
            search={props.search}
            typeFilter={props.typeFilter}
            genreFilter={props.genreFilter}
            onAnimeRenderFn={AnimeRenderFn}
          />
        ) : (
          ""
        )}
        <Top onAnimeRenderFn={AnimeRenderFn} />
        <Genre onExplored={Explored} />
        {exploredData ? (
          <GenreRender
            name={exploredData.name}
            genre={exploredData.genre}
            genreId={exploredData.genreId}
            onAnimeRenderFn={AnimeRenderFn}
          />
        ) : (
          <GenreRender name="Adventure" genre="adventure" genreId="1" onAnimeRenderFn={AnimeRenderFn}/>
        )}
        <AnimeRender
          display={animeRenderDisplay}
          title={animeRenderTitle}
          onAnimeRenderCloseContainer={AnimeRenderCloseContainer}
        />
      </div>
    </React.StrictMode>
  );
};

export default Body;
