import { useContext} from "react";
import SearchContext from "../../../Helper/Context/Search/SearchContext";
import classes from "./SearchOptions.module.css";

const SearchOptions = (props) => {
  const SearchCtx = useContext(SearchContext);

  const onTypeFilterChange = (event) => {
    SearchCtx.setType(event.target.value);
  };

  const onGenreFilterChange = (event) => {
    SearchCtx.setGenre(event.target.value);
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
