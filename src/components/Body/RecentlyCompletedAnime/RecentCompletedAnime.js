import React, { useEffect, useState } from "react";
import AnimeCard from "../../Helper/AnimeCard/AnimeCard";
import classes from "./RecentCompletedAnime.module.css";

const RecentCompletedAnime = () => {
  const [recentCompletedAnimeDatas, setRecentCompletedAnimeDatas] = useState(
    []
  );
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
  //         setrecentCompletedAnime(response.top);
  //       })
  //       .catch((err) => {
  //         setrecentCompletedAnime(null);
  //       });
  //   }, 1);
  // }, []);

  useEffect(() => {
    let query = `
    query ($page: Int) {
        Page(page: $page) {
          media(type: ANIME,status: FINISHED,sort:END_DATE_DESC,format:TV) {
            id
            genres
            title {
              romaji
              english
              native
            }
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            coverImage {
              large
              medium
              color
            }
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
        setRecentCompletedAnimeDatas(response.data.Page.media);
      })
      .catch((err) => {
        setRecentCompletedAnimeDatas(null);
        console.error(err);
      });
  }, []);

  const leftClicked = () => {
    if (index > 0) {
      setIndex(index - 1);
      setNumber(number - 1);
    }
  };

  const rightClicked = () => {
    if (index < recentCompletedAnimeDatas.length - 1) {
      setIndex(index + 1);
      setNumber(number + 1);
    }
  };

  return (
    <React.Fragment>
      {recentCompletedAnimeDatas ? (
        <div className={classes.container}>
          <button onClick={leftClicked} className={classes.left}>
            {"<"}
          </button>
          <button onClick={rightClicked} className={classes.right}>
            {">"}
          </button>
          <h2>Recent Completed Anime</h2>
          <ul>
            {recentCompletedAnimeDatas
              .slice(index, number)
              .map((recentCompletedAnimeEditedData) => {
                return (
                  <AnimeCard
                    key={recentCompletedAnimeEditedData.id}
                    id={recentCompletedAnimeEditedData.id}
                    titleEnglish={recentCompletedAnimeEditedData.title.english}
                    titleRomaji={recentCompletedAnimeEditedData.title.romaji}
                    imageUrl={recentCompletedAnimeEditedData.coverImage.large}
                    startDate={{
                      year: recentCompletedAnimeEditedData.startDate.year,
                      month: recentCompletedAnimeEditedData.startDate.month,
                      day: recentCompletedAnimeEditedData.startDate.day,
                    }}
                    endDate={{
                      year: recentCompletedAnimeEditedData.endDate.year,
                      month: recentCompletedAnimeEditedData.endDate.month,
                      day: recentCompletedAnimeEditedData.endDate.day,
                    }}

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

export default RecentCompletedAnime;
