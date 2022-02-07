import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./index.module.scss";
import { Navbar } from "../../components/Navbar";
import { getMyPokemons, checkPrime, renamePokemon } from "../../store/action";
import { Card } from "../../components/Card";

const MyPokemons = () => {
  const dispatch = useDispatch();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const myPokemons = useSelector((state) => state.pokemonReducers.myPokemons);
  const [notifFailed, setNotifFailed] = useState(false);
  const [notifSuccessRename, setNotifSuccessRename] = useState(false);

  useEffect(() => {
    dispatch(getMyPokemons());
  }, []);

  const resetStatus = () => {
    setNotifFailed(false);
    setNotifSuccessRename(false);
  }

  const releasePokemon = (id) => {
    resetStatus();
    dispatch(checkPrime(id,
    () => {
      setNotifFailed(true)
    }
    ));
  }

  const handleUpdatePokemon = (e) => {
    e.preventDefault();
    resetStatus();
    if (selectedPokemon.nickname.length > 0) {
      dispatch(renamePokemon(selectedPokemon,
        () => {
          setSelectedPokemon(null);
        }
      ));
    }
  }

  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.wraper}>
        {notifFailed && <p>Failed to Release</p>}
        {notifSuccessRename && <p>Pokemon Renamed</p>}
        {selectedPokemon && (
          <div>
            <form onSubmit={handleUpdatePokemon}>
              <input
                type="text"
                value={selectedPokemon.nickname}
                onChange={(e) =>
                  setSelectedPokemon({
                    ...selectedPokemon,
                    nickname: e.target.value,
                  })
                }
              ></input>
              <button type='submit'>Submit</button>
            </form>
          </div>
        )}
        {myPokemons &&
          myPokemons.map((pokemon, idx) => {
            return (
              <Card
                pokemon={pokemon}
                releasePokemon={releasePokemon}
                setSelectedPokemon={setSelectedPokemon}
                notifFailed={notifFailed}
                key={idx}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MyPokemons;
