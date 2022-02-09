import React, { useState, useEffect } from "react";
import classes from "./index.module.scss";
import { Navbar } from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../store/action";
import { useParams, useNavigate } from "react-router-dom";
import { checkProbability, catchPokemon } from "../../store/action";
import { ProgressBar, Button, Modal, Form } from "react-bootstrap";
import swal from "sweetalert";

const Detail = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonReducers.pokemon);

  useEffect(() => {
    dispatch(getPokemon(id));
  }, []);

  const probability = () => {
    dispatch(
      checkProbability(
        () => {
          setShow(true);
        },
        () => {
          swal("Try Again!", "Failed to Catch Pokemon");
        }
      )
    );
  };

  const catchHandler = (e) => {
    e.preventDefault();
    const newPokemon = {
      pokemonId: pokemon.id,
      nickname: nickname,
      imageUrl: pokemon.imageUrl,
    };
    dispatch(
      catchPokemon(newPokemon, () => {
        setShow(false);
        navigate(`/mypokemon`);
      })
    );
  };

  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.wraper}>
        <div className={classes.content}>
          <div className={classes.card}>
            <img src={pokemon?.imageUrl} alt={pokemon?.name} />
          </div>
          <div className={classes.detail_inform}>
            <div style={{ display: "flex" }} className="detail-name">
              <h1>{pokemon?.name}</h1>
              <h6 style={{ marginTop: 5 }}>#00{id}</h6>
            </div>
            <div className={classes.detail_abilities}>
              <span>
                <b>Abilities :</b> {pokemon.abilities}{" "}
              </span>
            </div>
            <div className={classes.inform}>
              <div>
                <span>Attack</span>
                <ProgressBar
                  label={pokemon?.Attack + "%"}
                  variant={
                    pokemon?.Attack < 30
                      ? "danger"
                      : pokemon?.Attack < 50
                      ? "warning"
                      : pokemon?.Attack < 70
                      ? "success"
                      : "primary"
                  }
                  now={pokemon?.Attack}
                  style={{ backgroundColor: "rgb(207, 205, 205)" }}
                />
              </div>
              <div>
                <span>HP</span>
                <ProgressBar
                  label={pokemon?.HP + "%"}
                  variant={
                    pokemon?.HP < 30
                      ? "danger"
                      : pokemon?.HP < 50
                      ? "warning"
                      : pokemon?.HP < 70
                      ? "success"
                      : "primary"
                  }
                  now={pokemon?.HP}
                  style={{ backgroundColor: "rgb(207, 205, 205)" }}
                />
              </div>
              <div>
                <span>Defense</span>
                <ProgressBar
                  label={pokemon?.Defense + "%"}
                  variant={
                    pokemon?.Defense < 30
                      ? "danger"
                      : pokemon?.Defense < 50
                      ? "warning"
                      : pokemon?.Defense < 70
                      ? "success"
                      : "primary"
                  }
                  now={pokemon?.Defense}
                  style={{ backgroundColor: "rgb(207, 205, 205)" }}
                />
              </div>
            </div>
          </div>
        </div>
        <Button onClick={probability}>Try Catch Pokemon</Button>
        {show && (
          <Modal show={true} onHide={() => setShow(false)} centered>
            <Modal.Body>
              <h4>Nickname Pokemon</h4>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={catchHandler}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Detail;
