import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./index.module.scss";
import { Navbar } from "../../components/Navbar";
import { getMyPokemons, checkPrime, renamePokemon } from "../../store/action";
import CardmyPokemon from "../../components/Card-myPokemon";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";

const MyPokemons = () => {
  const dispatch = useDispatch();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const myPokemons = useSelector((state) => state.pokemonReducers.myPokemons);

  useEffect(() => {
    dispatch(getMyPokemons());
  }, []);

  const releasePokemon = (id) => {
    dispatch(
      checkPrime(id, () => {
        swal("Try Again!", "Failed to release pokemon");
      })
    );
  };

  const handleUpdatePokemon = (e) => {
    e.preventDefault();
    if (selectedPokemon.nickname.length > 0) {
      dispatch(
        renamePokemon(selectedPokemon, () => {
          setSelectedPokemon(null);
        })
      );
    }
    setSelectedPokemon(null);
  };

  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.wraper}>
        <div className={classes.action}>
          {selectedPokemon && (
            <Modal show={true} onHide={() => setSelectedPokemon(null)} centered>
              <Modal.Body>
                <h4>Rename Pokemon</h4>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    value={selectedPokemon.nickname}
                    onChange={(e) =>
                      setSelectedPokemon({
                        ...selectedPokemon,
                        nickname: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedPokemon(null)}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdatePokemon}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
        <div className={classes.listPokemon}>
          {myPokemons &&
            myPokemons.map((pokemon, idx) => {
              return (
                <CardmyPokemon
                  pokemon={pokemon}
                  releasePokemon={releasePokemon}
                  setSelectedPokemon={setSelectedPokemon}
                  key={idx}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MyPokemons;
