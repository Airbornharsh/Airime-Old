import { createContext } from "react";

const FavouriteContext = createContext({
  display: false,
  data: [],
  isLoading: false,
  setDisplay: () => {},
  setData: () => {},
  setIsLoading: () => {},
});

export default FavouriteContext;
