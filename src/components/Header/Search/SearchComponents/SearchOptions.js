import { useState } from "react";
import classes from "./SearchOptions.module.css";

const SearchOptions = (props) => {
  const [type, setType] = useState("anime");
  const [genre, setGenre] = useState("");

  const onTypeFilterChange = (event) => {
    setType(event.target.value);
    props.onTypeFilterValue(event.target.value);
  };

  const onGenreFilterChange = (event) => {
    setGenre(event.target.value);
    props.onGenreFilterValue(event.target.value);
  };

  return (
    <div className={classes.container}>
      <select onChange={onTypeFilterChange} className="types">
        <option value="anime">Anime</option>
        <option value="manga">Manga</option>
      </select>
      <select onChange={onGenreFilterChange} className="genre">
        <option value="all">ALL</option>
        <option value="action">Action</option>
        <option value="drama">Drama</option>
        <option value="romance">Romance</option>
      </select>
    </div>
  );
};

export default SearchOptions;
