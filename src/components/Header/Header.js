import classes from "./Header.module.css";

import background from "../../assests/Images/Header/HeaderBackground.jpg";

import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import Account from "./Account/Account";

const Header = (props) => {
  return (
    <header className={classes.container}>
      <Logo />
      <Search />
      <Account />
      <img className={classes.background} src={background} alt="background" />
    </header>
  );
};

export default Header;
