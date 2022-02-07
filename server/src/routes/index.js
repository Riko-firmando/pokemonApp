const express = require("express");
const router = express.Router();
const {
  myPokemons,
  myPokemon,
  checkProbability,
  catchPokemon,
  checkNumber,
  releasePokemon,
  renamePokemon,
} = require("../controllers");

router.get("/myPokemons", myPokemons);
router.get("/myPokemon/:id", myPokemon);
router.get("/checkProbability", checkProbability);
router.get("/checkNumber", checkNumber);
router.post("/catchPokemon", catchPokemon);
router.delete("/releasePokemon/:id", releasePokemon);
router.patch("/renamePokemon/:id", renamePokemon);

module.exports = router;
