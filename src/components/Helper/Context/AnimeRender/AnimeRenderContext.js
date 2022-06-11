import { createContext } from "react";

const AnimeRenderContext = createContext({
  id: "",
  display: "none",
  httpData: "",
  httpRequest: false,
  setId: () => {},
  setDisplay: () => {},
  setHttpData: () => {},
  setHttpRequest: () => {},
});

export default AnimeRenderContext;
