import { createContext } from "react";

const AnimeRenderContext = createContext({
  id: "",
  display: "none",
  httpRequest: false,
  setId: () => {},
  setDisplay: () => {},
  setHttpRequest: () => {},
});

export default AnimeRenderContext;
