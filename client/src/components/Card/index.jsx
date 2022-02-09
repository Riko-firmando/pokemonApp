import React, { useState } from "react";
import classes from "./index.module.scss";
import { useLocation } from "react-router-dom";

export const Card = ({
  pokemon,
  toDetail,
  releasePokemon,
  setSelectedPokemon,
  num,
}) => {
  const location = useLocation();
  return (
    <div
      className={classes.card}
      onClick={() => toDetail(pokemon.url.split("/")[6])}
    >
      <div className={classes.num}>
        <span>#00{num + 1}</span>
      </div>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
};

export default Card;
