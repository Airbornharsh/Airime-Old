import { useState } from "react";
import FavouriteContext from "./FavouriteContext";

const FavouriteProvider = (props) => {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const settingDisplay = (data) => {
    setDisplay(data);
  };

  const settingData = (data) => {
    setData(data);
  };

  const settingIsLoading = (data) => {
    setIsLoading(data);
  };

  const favouriteContext = {
    display: display,
    data: data,
    isLoading: isLoading,
    setDisplay: settingDisplay,
    setData: settingData,
    setIsLoading: settingIsLoading,
  };

  return (
    <FavouriteContext.Provider value={favouriteContext}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;
