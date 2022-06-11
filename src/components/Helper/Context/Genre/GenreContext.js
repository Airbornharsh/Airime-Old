import { createContext } from "react";

const GenreContext = createContext({
  id: "",
  genre: "adventure",
  name: "Adventure",
  setId: () => {},
  setGenre: () => {},
  setName: () => {},
});

export default GenreContext;
