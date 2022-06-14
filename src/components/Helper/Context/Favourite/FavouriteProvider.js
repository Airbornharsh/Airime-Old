import { useState } from "react";
import FavouriteContext from "./FavouriteContext";

const FavouriteProvider = (props) => {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);

  const settingDisplay = (data) => {
    setDisplay(data);
  };

  const settingData = (data1) => {
    setData(data1);
  };

  const favouriteContext = {
    display: display,
    data: data,
    setDisplay: settingDisplay,
    setData: settingData,
  };

  return (
    <FavouriteContext.Provider value={favouriteContext}>
      {props.children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;
