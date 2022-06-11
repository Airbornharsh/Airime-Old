import React from "react";
import classes from "./Search.module.css";

import SearchInput from "./SearchComponents/SearchInput";
import SearchOptions from "./SearchComponents/SearchOptions";

const Search = (props) => {

  return (
    <div className={classes.container}>
      <SearchInput/>
      <SearchOptions/>
    </div>
  );
};

export default Search;
