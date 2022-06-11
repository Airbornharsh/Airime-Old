import classes from "./GenreCard.module.css";

import pic from "../../../../assests/Images/Header/HeaderBackground.jpg";
import GenreRender from "../../../Body/Genre/GenreData/GenreRender/GenreRender";
import { useContext } from "react";
import GenreContext from "../../Context/Genre/GenreContext";

const GenreCard = (props) => {
  const GenreCtx = useContext(GenreContext);

  const Explored = () => {
    GenreCtx.setGenre(props.genre);
    GenreCtx.setName(props.name)
  };

  return (
    <li className={classes.container}>
      <img src={pic} alt="" />
      <h2>{props.name}</h2>
      <button onClick={Explored}>EXPLORE</button>
    </li>
  );
};

export default GenreCard;
