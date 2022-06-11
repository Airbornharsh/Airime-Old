import { useState, useContext } from "react";
import SearchContext from "../../../Helper/Context/Search/SearchContext";
import classes from "./SearchInput.module.css";

const SearchInput = (props) => {
  const [Search, setSearch] = useState(null);
  const SearchCtx = useContext(SearchContext); 


  const Searched = (event) => {
    event.preventDefault();
    SearchCtx.setSearch(Search);
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
