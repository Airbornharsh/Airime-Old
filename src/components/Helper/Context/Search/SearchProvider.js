import { useState } from "react";
import SearchContext from "./SearchContext";

const SearchProvider = (props) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("anime");
  const [genre, setGenre] = useState("");

  const settingSearch = (data) => {
    setSearch(data);
  };

  const settingType = (data) => {
    setType(data);
  };

  const settingGenre = (data) => {
    setGenre(data);
  };

  const searchContext = {
    search: search,
    type: type,
    genre: genre,
    setSearch: settingSearch,
    setType: settingType,
    setGenre: settingGenre,
  };

  return (
    <SearchContext.Provider value={searchContext}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
