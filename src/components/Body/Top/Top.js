import AnimeCard from "../../Helper/AnimeCard/AnimeCard";
import classes from "./Top.module.css";
import TopAnime from "./TopAnime/TopAnime";
import TopManga from "./TopManga/TopManga";

const Top = (props) => {
  const AnimeRenderFn = (display,title) => {
    props.onAnimeRenderFn(display,title);
  };

  return (
    <div>
      <TopAnime onAnimeRenderFn={AnimeRenderFn} />
      <TopManga />
    </div>
  );
};

export default Top;
