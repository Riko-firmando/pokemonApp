const initialState = {
  pokemons: [],
  pokemon: {},
  myPokemons: [],
};

export default function pokemonReducers(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return { ...state, pokemons: (state.pokemons = action.payload) };
    case "GET_POKEMON":
      return { ...state, pokemon: (state.pokemon = action.payload) };
    case "CATCH_POKEMON":
      return { ...state, myPokemons: state.myPokemons.concat(action.payload) };
    case "GET_MY_POKEMONS":
      return { ...state, myPokemons: (state.myPokemons = action.payload) };
    case "RELEASE_POKEMON":
      return {
        ...state,
        myPokemons: state.myPokemons.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
      };
    case "RENAME_POKEMON":
      let filter = state.myPokemons.filter(
        (pokemon) => pokemon.id !== action.payload.id
      );
      filter = filter.concat(action.payload.pokemon);
      filter.sort((a, b) => (a.id > b.id ? 1 : -1));
      return { ...state, myPokemons: (state.myPokemons = filter) };
    default:
      return state;
  }
}
