import React, { useState } from "react";
import classes from "./index.module.scss";
import { Button } from "react-bootstrap";

export const CardmyPokemon = ({
  pokemon,
  releasePokemon,
  setSelectedPokemon,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.myCard}>
        <h5>{pokemon.nickname}</h5>
        <img src={pokemon.imageUrl} alt={pokemon.name} />
        <div className={classes.btn}>
          <Button onClick={() => setSelectedPokemon(pokemon)}>Rename</Button>{" "}
          <Button onClick={() => releasePokemon(pokemon.id)}>Release</Button>
        </div>
      </div>
    </div>
  );
};

export default CardmyPokemon;
