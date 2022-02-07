import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import pokemonReducers from "./reducer";

const reducer = combineReducers({
  pokemonReducers,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
