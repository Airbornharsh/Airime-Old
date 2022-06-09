import React, { useEffect, useState } from "react";
import AnimeCard from "../../Helper/AnimeCard/AnimeCard";

import classes from "./SearchResults.module.css";

const SearchResults = (props) => {
  const [searchedDatas, setSearchedDatas] = useState(null);
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
        "https://jikan1.p.rapidapi.com/search/" +
        props.typeFilter +
        "?q=" +
        props.search;

      fetch(link, options)
        .then((response) => response.json())
        .then((response) => {
          setSearchedDatas(response.results);
          console.log(response.results);
        })
        .catch((err) => {
          setSearchedDatas(null);
          console.error(err);
        });
    }, 1);
  }, [props.search]);

  const leftClicked = () => {
    if (index > 0) {
      setIndex(index - 1);
      setNumber(number - 1);
    }
  };

  const rightClicked = () => {
    if (index < searchedDatas.length - 1) {
      setIndex(index + 1);
      setNumber(number + 1);
    }
  };

  const AnimeRenderFn = (display,title) => {
    props.onAnimeRenderFn(display,title);
  };

  return (
    <React.Fragment>
      {searchedDatas ? (
        <div className={classes.container}>
          <button onClick={leftClicked} className={classes.left}>
            {"<"}
          </button>
          <button onClick={rightClicked} className={classes.right}>
            {">"}
          </button>
          <h2>Searched Results for "{props.search}"</h2>
          <ul>
            {searchedDatas.slice(index, number).map((searchedEditedData) => {
              return (
                <AnimeCard
                  key={searchedEditedData.title}
                  rank={searchedEditedData.rank}
                  title={searchedEditedData.title}
                  url={searchedEditedData.url}
                  imageUrl={searchedEditedData.image_url}
                  type={searchedEditedData.type}
                  episodes={searchedEditedData.episodes}
                  startDate={searchedEditedData.start_date}
                  endDate={searchedEditedData.end_date}
                  onAnimeRenderFn = {AnimeRenderFn}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        // <div className={classes.container}>
        //   <h2>No Results for "{props.search}"</h2>
        // </div>
          ""
      )}
    </React.Fragment>
  );
};

export default SearchResults;
