import { Fragment, useContext } from "react";
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
      {favouriteCtx.isLoading ? (
        <div className={classes.loadingContainer}>
          <span></span>
        </div>
      ) : (
        <div>
          {favouriteCtx.display && (
            <div className={classes.container}>
              <h2 className={classes.heading}>Your Favourites</h2>
              <div className={classes.contentContainer}>
                <ul>
                  {favouriteCtx &&
                    favouriteCtx.data.map((id) => {
                      return <Favourite key={id} id={id} />;
                    })}
                </ul>
              </div>
              <button
                onClick={closeContainer}
                className={classes.closeContainer}
              >
                X
              </button>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Favourites;
