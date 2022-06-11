import { useState } from "react";
import GenreContext from "./GenreContext";

const GenreProvider = (props) => {
  const [id, setId] = useState("");
  const [genre, setGenre] = useState("adventure");
  const [name, setName] = useState("Adventure");

  const settingId = (data) => {
    setId(data);
  };

  const settingGenre = (data) => {
    setGenre(data);
  };

  const settingName = (data) => {
    setName(data);
  };

  const genreContextData = {
    id: id,
    genre: genre,
    name: name,
    setId: settingId,
    setGenre: settingGenre,
    setName: settingName,
  };

  return (
    <GenreContext.Provider value={genreContextData}>
      {props.children}
    </GenreContext.Provider>
  );
};

export default GenreProvider;
