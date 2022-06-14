import { Fragment, useContext} from "react";
import FavouriteContext from "../../Helper/Context/Favourite/FavouriteContext";
import classes from "./Favourites.module.css";
import Favourite from "./Favourite/Favourite";

const Favourites = () => {
  const favouriteCtx = useContext(FavouriteContext);


  const closeContainer = () => {
    favouriteCtx.setDisplay(false);
  };

  return (
    <Fragment>
      {favouriteCtx.display && (
        <div className={classes.container}>
          <div className={classes.contentContainer}>
            <ul>
              {favouriteCtx &&
                favouriteCtx.data.map((id) => {
                  return <Favourite key={id} id={id} />;
                })}
            </ul>
          </div>
          <button onClick={closeContainer} className={classes.closeContainer}>
            X
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Favourites;
