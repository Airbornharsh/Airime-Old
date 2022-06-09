import React from "react";
import classes from "./Search.module.css";

import SearchInput from "./SearchComponents/SearchInput";
import SearchOptions from "./SearchComponents/SearchOptions";

const Search = (props) => {
  const SearchValue = (data) => {
    props.onSearchValue(data);
  };

  const TypeFilterValue = (data) => {
    props.onTypeFilterValue(data);
  };

  const GenreFilterChange = (data) => {
    props.onGenreFilterChange(data);
  };

  return (
    <div className={classes.container}>
      <SearchInput onSearchValue={SearchValue} />
      <SearchOptions onGenreFilterChange={GenreFilterChange} onTypeFilterValue={TypeFilterValue} />
    </div>
  );
};

export default Search;
