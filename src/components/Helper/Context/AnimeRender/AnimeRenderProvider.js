import { useState } from "react";
import AnimeRenderContext from "./AnimeRenderContext";

const AnimeTitleProvider = (props) => {
  const [id, setId] = useState("");
  const [display, setDisplay] = useState("none");
  const [httpRequest, setHttpRequest] = useState(false);

  const settingId = (data) => {
    setId(data);
  };

  const settingDisplay = (data) => {
    setDisplay(data);
  };

  const settingHttpRequest = (data) => {
    setHttpRequest(data);
  };

  const animeRenderContextData = {
    id: id,
    display: display,
    httpRequest: httpRequest,
    setId: settingId,
    setDisplay: settingDisplay,
    setHttpRequest: settingHttpRequest,
  };

  return (
    <AnimeRenderContext.Provider value={animeRenderContextData}>
      {props.children}
    </AnimeRenderContext.Provider>
  );
};

export default AnimeTitleProvider;
