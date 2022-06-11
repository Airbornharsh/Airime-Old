import React, { useContext, useEffect, useState } from "react";
import AnimeCard from "../../Helper/AnimeCard/AnimeCard";
import SearchContext from "../../Helper/Context/Search/SearchContext";

import classes from "./SearchResults.module.css";

const SearchResults = (props) => {
  const [searchedDatas, setSearchedDatas] = useState(null);
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(5);
  const SearchCtx = useContext(SearchContext);

  useEffect(() => {
    let query = `
    query ($page: Int,$perPage:Int,$search: String) {
      Page(page: $page,perPage: $perPage) {
        media(type: ANIME,search: $search) {
          id
          genres
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
          description
          bannerImage
        }
      }
    }
    
    `;

    let variables = {
      page: 1,
      perPage: 50,
      search: SearchCtx.search,
    };

    const url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

    fetch(url, options)
      .then((response) => {
        return response.json().then((json) => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then((response) => {
        setSearchedDatas(response.data.Page.media);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [SearchCtx.search]);

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
          <h2>Searched Results for "{SearchCtx.search}"</h2>
          <ul>
            {searchedDatas.slice(index, number).map((searchedEditedData) => {
              return (
                <AnimeCard
                  key={searchedEditedData.id}
                  id={searchedEditedData.id}
                  titleEnglish={searchedEditedData.title.english}
                  titleRomaji={searchedEditedData.title.romaji}
                  imageUrl={searchedEditedData.coverImage.large}
                  description={searchedEditedData.description}
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

export default SearchResults;
