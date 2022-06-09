import { useEffect, useState } from "react";
import AnimeCard from "../../../Helper/AnimeCard/AnimeCard";
import classes from "./TopManga.module.css";

const TopManga = () => {
  const [topMangaDatas, setTopMangaDatas] = useState([]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "jikan1.p.rapidapi.com",
      "X-RapidAPI-Key": "40c256fd36msh733f84981819a1fp108278jsn4e817c0e643f",
    },
  };

  useEffect(() => {
    fetch("https://jikan1.p.rapidapi.com/top/manga/1/upcoming", options)
      .then((response) => response.json())
      .then((response) => {
        setTopMangaDatas(response.top);
      })
        .catch((err) => {
            setTopMangaDatas(null);
        });
  }, []);

  return (
    <ul className={classes.container}>
      {topMangaDatas
        ? topMangaDatas.map((topMangaData) => {
            return (
              <AnimeCard
                key={topMangaData.title}
                rank={topMangaData.rank}
                title={topMangaData.title}
                url={topMangaData.url}
                imageUrl={topMangaData.image_url}
                type={topMangaData.type}
                episodes={topMangaData.episodes}
                startDate={topMangaData.start_date}
                endDate={topMangaData.end_date}
              />
            );
          })
        : ""}
    </ul>
  );
};

export default TopManga;
