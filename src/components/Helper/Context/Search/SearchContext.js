import { createContext } from "react";

const SearchContext = createContext({
  search: "",
  type: "anime",
  genre: "",
  setSearch: () => {},
  setType: () => {},
  setGenre: () => {},
});

export default SearchContext;
