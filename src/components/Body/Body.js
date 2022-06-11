import React, { useContext } from "react";
import AnimeRender from "../AnimeRender/AnimeRender";
import classes from "./Body.module.css";
import Genre from "./Genre/Genre";
import GenreRender from "./Genre/GenreData/GenreRender/GenreRender";
import SearchResults from "./SearchResults/SearchResults";
import Top from "./Top/Top";
import AnimeTitleProvider from "../Helper/Context/AnimeRender/AnimeRenderProvider";
import SearchContext from "../Helper/Context/Search/SearchContext";

const Body = (props) => {
  const SearchCtx = useContext(SearchContext);

  return (
    // <React.StrictMode>
    <AnimeTitleProvider>
      <div className={classes.container}>
        {SearchCtx.search ? <SearchResults /> : ""}
        <Top />
        <Genre/>
        <GenreRender/>
        <AnimeRender />
      </div>
    </AnimeTitleProvider>
    // </React.StrictMode>
  );
};

export default Body;
