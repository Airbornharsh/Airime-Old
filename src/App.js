import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import FavouriteProvider from "./components/Helper/Context/Favourite/FavouriteProvider";
import GenreProvider from "./components/Helper/Context/Genre/GenreProvider";
import SearchProvider from "./components/Helper/Context/Search/SearchProvider";
import SignProvider from "./components/Helper/Context/Sign/SignProvider";

function App() {
  return (
    <FavouriteProvider>
      <SignProvider>
        <SearchProvider>
          <GenreProvider>
            <Header />
            <Body />
          </GenreProvider>
        </SearchProvider>
      </SignProvider>
    </FavouriteProvider>
  );
}

export default App;
