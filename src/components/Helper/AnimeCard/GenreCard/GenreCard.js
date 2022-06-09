import classes from "./GenreCard.module.css";

import pic from "../../../../assests/Images/Header/HeaderBackground.jpg";
import GenreRender from "../../../Body/Genre/GenreData/GenreRender/GenreRender";

const GenreCard = (props) => {
  const Explored = () => {
    props.onExplored(props);
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
