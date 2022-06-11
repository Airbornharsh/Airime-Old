import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import GenreContext from "./components/Helper/Context/Genre/GenreContext";
import GenreProvider from "./components/Helper/Context/Genre/GenreProvider";
import SearchProvider from "./components/Helper/Context/Search/SearchProvider";

function App() {
  return (
    <SearchProvider>
      <GenreProvider>
        <Header />
        <Body />
      </GenreProvider>
    </SearchProvider>
  );
}

export default App;
