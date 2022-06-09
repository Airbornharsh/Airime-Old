import { useState, useEffect } from "react";
import check from "../../../check";
import classes from "./SearchInput.module.css";

const SearchInput = (props) => {
  const [Search, setSearch] = useState(null);


  const Searched = (event) => {
    event.preventDefault();
    props.onSearchValue(Search);
  };

  const SearchChange = (event) => {
    const Search = event.target.value;
    if (Search) {
      let temp = "";
      Search.toLowerCase();
      for (let i = 0; i < Search.length; i++) {
        if (Search[i] !== " ") {
          temp += Search[i];
        } else {
          temp += "%20";
        }
      }
      setSearch(temp.toLowerCase());
    }
  };

  return (
    <form typeof="submit" className={classes.container}>
      <input onChange={SearchChange} placeholder="Search Here" />
      <button type="submit" onClick={Searched}>Search</button>
    </form>
  );
};

export default SearchInput;
