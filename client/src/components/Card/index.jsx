import React, { useState } from "react";
import classes from "./index.module.scss";
import { useLocation } from "react-router-dom";

export const Card = ({ pokemon, toDetail, releasePokemon, setSelectedPokemon }) => {
  const location = useLocation();
  return (
    <div className={classes.container}>
      <div className={classes.wraper}>
        {location.pathname === "/" ? (
          <div className={classes.card} onClick={() => toDetail(pokemon.url.split("/")[6])}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ) : (
          <div className={classes.myCardWraper}>
            <div className={classes.myCard}>
              <img src={pokemon.imageUrl} alt={pokemon.name} />
              <p>{pokemon.nickname}</p>
              <div className={classes.btn}>
                <button onClick={() => setSelectedPokemon(pokemon)}>Rename</button>
                <button onClick={() => releasePokemon(pokemon.id)}>Release</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
