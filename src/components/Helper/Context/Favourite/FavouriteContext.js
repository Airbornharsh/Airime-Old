import { createContext } from "react";

const FavouriteContext = createContext({
  display: false,
  data: [],
  setDisplay: () => {},
  setData: () => {},
});

export default FavouriteContext;
