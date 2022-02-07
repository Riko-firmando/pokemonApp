const { Pokemon } = require("../../models");
const exclude = ["updatedAt", "createdAt"];

exports.myPokemons = async (req, res) => {
  try {
    let allPokemons = await Pokemon.findAll({
      attributes: {
        exclude,
      },
    });

    res.status(200).send({
      status: "Success",
      allPokemons,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.myPokemon = async (req, res) => {
  try {
    const { id } = req.params;
    let pokemon = await Pokemon.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude,
      },
    });

    if (!pokemon) {
      return res.status(404).send({
        status: "Failed",
        message: "Pokemon not found",
      });
    }

    res.status(200).send({
      status: "Success",
      pokemon,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.checkProbability = async (req, res) => {
  try {
    const successRate = Math.ceil(Math.random() * 4);

    if (successRate > 2) {
      res.status(200).send({
        status: "Success",
        catchStatus: "Success",
      });
    } else {
      res.status(200).send({
        status: "Success",
        catchStatus: "Failed",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.catchPokemon = async (req, res) => {
  try {
    const data = req.body;
    const nickname = data.nickname;

    const exist = await Pokemon.findOne({
      where: {
        nickname,
      },
      exclude,
    });

    if (exist) {
      res.status(401).send({
        status: "Failed",
        message: "Nickname already exist",
      });
    }

    newPokemon = await Pokemon.create({ ...data, renameCount: "0" });

    res.status(200).send({
      status: "Success",
      newPokemon,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.checkNumber = async (req, res) => {
  try {
    const number = Math.ceil(Math.random() * 30);

    res.status(200).send({
      status: "Success",
      number,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.releasePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findOne({
      where: {
        id: id,
      },
    });

    if (!pokemon) {
      res.status(404).send({
        status: "Failed",
        message: "Pokemon not Found",
      });
    }

    await Pokemon.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: "Success",
      message: "Pokemon Released",
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

const generateFibonacciNumber = (num) => {
  var a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }
  return b;
};

exports.renamePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const pokemonExist = await Pokemon.findOne({
      where: {
        id,
      },
    });

    if (!pokemonExist) {
      return res.status(404).send({
        status: "Failed",
        message: "Pokemon not Found",
      });
    }

    const fibonacciIndex = Number(pokemonExist.renameCount) - 1;
    const fibonacciNumber = generateFibonacciNumber(fibonacciIndex);
    const pokemon = {
      nickname: `${data.nickname}-${fibonacciNumber}`,
      imageUrl: data.imageUrl,
      pokemonId: data.pokemonId,
      renameCount: Number(pokemonExist.renameCount) + 1,
    };

    await Pokemon.update(pokemon, {
      where: {
        id,
      },
    });

    const updatedPokemon = await Pokemon.findOne({
      where: {
        id,
      },
      attributes: {
        exclude,
      },
    });

    res.status(200).send({
      status: "Success",
      pokemon: updatedPokemon,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};
