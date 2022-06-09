import classes from "./Header.module.css";

import background from "../../assests/Images/Header/HeaderBackground.jpg";

import Logo from "./Logo/Logo";
import Search from "./Search/Search";

const Header = (props) => {
  const SearchValue = (data) => {
    props.onSearchValue(data);
  };

  const TypeFilterValue = (data) => {
    props.onTypeFilterValue(data);
  };

  const GenreFilterChange = (data) => {
    props.onGenreFilterChange(data);
  };

  return (
    <header className={classes.container}>
      <Logo />
      <Search onSearchValue={SearchValue}  onGenreFilterChange={GenreFilterChange} onTypeFilterValue={TypeFilterValue}/>
      <img className={classes.background} src={background} alt="background" />
    </header>
  );
};

export default Header;
