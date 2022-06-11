import classes from "./Header.module.css";

import background from "../../assests/Images/Header/HeaderBackground.jpg";

import Logo from "./Logo/Logo";
import Search from "./Search/Search";

const Header = (props) => {
  return (
    <header className={classes.container}>
      <Logo />
      <Search />
      <img className={classes.background} src={background} alt="background" />
    </header>
  );
};

export default Header;
