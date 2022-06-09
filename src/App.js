import { useState } from "react";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";

function App() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("anime");
  const [genreFilter, setGenreFilter] = useState("");

  const SearchValue = (data) => {
    setSearch(data);
  };

  const TypeFilterValue = (data) => {
    setTypeFilter(data);
  };

  const GenreFilterChange = (data) => {
    setGenreFilter(data);
  };

  return (
    <div className="App">
      <Header
        onSearchValue={SearchValue}
        onGenreFilterChange={GenreFilterChange}
        onTypeFilterValue={TypeFilterValue}
      />
      <Body search={search} typeFilter={typeFilter} genreFilter={genreFilter} />
    </div>
  );
}

export default App;
