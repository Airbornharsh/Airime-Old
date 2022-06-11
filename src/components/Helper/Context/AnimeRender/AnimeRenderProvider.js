import { useState } from "react";
import AnimeRenderContext from "./AnimeRenderContext";

const AnimeTitleProvider = (props) => {
  const [id, setId] = useState("");
  const [display, setDisplay] = useState("none");
  const [httpData, setHttpData] = useState();
  const [httpRequest, setHttpRequest] = useState(false);

  const settingId = (data) => {
    setId(data);
  };

  const settingDisplay = (data) => {
    setDisplay(data);
  };

  const settingHttpData = (data) => {
    setHttpData(data);
  };

  const settingHttpRequest = (data) => {
    setHttpRequest(data);
  };

  const animeRenderContextData = {
    id: id,
    display: display,
    httpData: httpData,
    httpRequest: httpRequest,
    setId: settingId,
    setDisplay: settingDisplay,
    setHttpData: settingHttpData,
    setHttpRequest: settingHttpRequest,
  };

  return (
    <AnimeRenderContext.Provider value={animeRenderContextData}>
      {props.children}
    </AnimeRenderContext.Provider>
  );
};

export default AnimeTitleProvider;
