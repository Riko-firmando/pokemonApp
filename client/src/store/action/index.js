import { baseAPI, pokeAPI } from "../../config";
import {
  GET_POKEMONS,
  GET_POKEMON,
  CATCH_POKEMON,
  GET_MY_POKEMONS,
  RELEASE_POKEMON,
  RENAME_POKEMON,
} from "../constants";

import { isPrimeNumber } from "../../helper/primeNumber";

export const getPokemons = () => {
  return (dispatch) => {
    pokeAPI
      .get("/pokemon")
      .then(({ data }) => {
        let pokemons = [];
        data.results.map((pokemon, i) => {
          pokemons.push({
            name: pokemon.name,
            url: pokemon.url,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
              i + 1
            }.svg`,
          });
        });
        dispatch({
          type: GET_POKEMONS,
          payload: pokemons,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getPokemon = (id) => {
  return (dispatch) => {
    pokeAPI
      .get(`/pokemon/${id}`)
      .then(({ data }) => {
        let pokemon = {
          name: data.name,
          id: data.id,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
          types: data.types.map((item) => item.type.name).join(", "),
          moves: data.moves
            .map((item) => item.move.name)
            .slice(0, 3)
            .join(", "),
          abilities: data.abilities.map((item) => item.ability.name).join(", "),
          HP: data.stats[0].base_stat,
          Attack: data.stats[1].base_stat,
          Defense: data.stats[2].base_stat,
        };
        dispatch({
          type: GET_POKEMON,
          payload: pokemon,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const checkProbability = (cbSuccess, cbFailed) => {
  return (dispatch) => {
    baseAPI
      .get(`/checkProbability`)
      .then(({ data }) => {
        if (data.catchStatus === "Success") {
          cbSuccess && cbSuccess();
        } else {
          cbFailed && cbFailed();
        }
      })
      .catch((err) => console.log(err));
  };
};

export const catchPokemon = (pokemon, cbSuccess) => {
  return (dispatch) => {
    baseAPI
      .post(`/catchPokemon`, pokemon)
      .then(({ data }) => {
        dispatch({
          type: CATCH_POKEMON,
          payload: pokemon,
        });
        cbSuccess && cbSuccess();
      })
      .catch((err) => console.log(err));
  };
};

export const getMyPokemons = () => {
  return (dispatch) => {
    baseAPI
      .get(`/myPokemons`)
      .then(({ data }) => {
        dispatch({
          type: GET_MY_POKEMONS,
          payload: data.allPokemons,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const checkPrime = (id, cbFailed) => {
  return (dispatch) => {
    baseAPI
      .get("/checkNumber")
      .then(({ data }) => {
        if (isPrimeNumber(data.number)) {
          return baseAPI.delete(`/releasePokemon/${id}`);
        } else {
          cbFailed && cbFailed();
        }
      })
      .then(({ data }) => {
        dispatch({
          type: RELEASE_POKEMON,
          payload: id,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const renamePokemon = (pokemon, cbSuccess) => {
  return (dispatch) => {
    baseAPI
      .patch(`/renamePokemon/${pokemon.id}`, pokemon)
      .then(({ data }) => {
        dispatch({
          type: RENAME_POKEMON,
          payload: { pokemon: data.pokemon, id: pokemon.id },
        });
        cbSuccess && cbSuccess();
      })
      .catch((err) => console.log(err));
  };
};
