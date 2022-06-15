import React, { useEffect, useState } from "react";
import AnimeCard from "../../../Helper/AnimeCard/AnimeCard";
import classes from "./TopAnime.module.css";

const TopAnime = () => {
  const [topAnimeDatas, setTopAnimeDatas] = useState([]);
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(5);

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Host": "jikan1.p.rapidapi.com",
  //     "X-RapidAPI-Key": "40c256fd36msh733f84981819a1fp108278jsn4e817c0e643f",
  //   },
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetch("https://jikan1.p.rapidapi.com/top/anime/1/upcoming", options)
  //       .then((response) => response.json())
  //       .then((response) => {
  //         setTopAnimeDatas(response.top);
  //       })
  //       .catch((err) => {
  //         setTopAnimeDatas(null);
  //       });
  //   }, 1);
  // }, []);

  useEffect(() => {
    let query = `
    query ($page: Int,$perPage: Int) {
      Page(page: $page,perPage: $perPage) {
        media(type: ANIME, popularity_greater: 100000) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
            color
          }
          description
        }
      }
    }
    
    `;

    let variables = {
      page: 2,
      perPage: 50,
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
        setTopAnimeDatas(response.data.Page.media);
      })
      .catch((err) => {
        setTopAnimeDatas(null);
        console.error(err);
      });
  },[]);

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
          <h2>Top Anime</h2>
          <ul>
            {topAnimeDatas.slice(index, number).map((topAnimeEditedData) => {
              return (
                <AnimeCard
                  key={topAnimeEditedData.id}
                  id={topAnimeEditedData.id}
                  titleEnglish={topAnimeEditedData.title.english}
                  titleRomaji = {topAnimeEditedData.title.romaji}
                  imageUrl={topAnimeEditedData.coverImage.large}
                  description={topAnimeEditedData.description}

                  // key={topAnimeEditedData.title}
                  // id={topAnimeEditedData.mal_id}
                  // rank={topAnimeEditedData.rank}
                  // title={topAnimeEditedData.title}
                  // url={topAnimeEditedData.bannerImage}
                  // imageUrl={topAnimeEditedData.image_url}
                  // type={topAnimeEditedData.type}
                  // episodes={topAnimeEditedData.episodes}
                  // startDate={topAnimeEditedData.start_date}
                  // endDate={topAnimeEditedData.end_date}
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
