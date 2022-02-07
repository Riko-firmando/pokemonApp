import React from "react";
import classes from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import Pokemon from '../../assets/icon/pokemon.png';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.wraper}>
        <img className={classes.title} onClick={() => navigate("/")} src={Pokemon} alt='pokemon' />
        <div className={classes.navbar}>
          <p onClick={() => navigate("/")}>Dashboard</p>
          <p onClick={() => navigate("/mypokemon")}>My Pokemons</p>
        </div>
      </div>
    </div>
  );
};
