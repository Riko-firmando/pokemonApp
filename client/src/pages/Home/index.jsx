import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { getPokemons } from "../../store/action";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemonReducers.pokemons);
  const toDetail = (pokemonId) => {
    navigate(`pokemon/${pokemonId}`);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.home_container}>
        <div className={classes.btn}>
          {/* <span>Next</span> <span>Previous</span> */}
        </div>
        <div className={classes.wraper}>
          {pokemons &&
            pokemons.map((pokemon, idx) => {
              return (
                <Card
                  key={idx}
                  pokemon={pokemon}
                  num={idx}
                  toDetail={toDetail}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
