import axios from "axios";

export const baseAPI = axios.create({
  baseURL: "http://localhost:5000/api/phincon",
});

export const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});
