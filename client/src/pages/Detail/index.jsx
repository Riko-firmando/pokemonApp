import React,{ useState, useEffect} from "react";
import classes from "./index.module.scss";
import { Navbar } from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../store/action";
import { useParams, useNavigate } from "react-router-dom";
import { checkProbability, catchPokemon } from "../../store/action";

const Detail = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [show, setShow] = useState(false);
  const [notifFailed, setNotifFailed] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonReducers.pokemon);
  
  useEffect(() => {
    dispatch(getPokemon(id));
  }, []);

  const resetStatus = () => {
    setShow(false);
    setNotifFailed(false);
  }

  const probability = () => {
    resetStatus();
    dispatch(checkProbability(
      () => {
        setShow(true)
      },
      () => {
        setNotifFailed(true)
      }
    ))
  }

  const catchHandler = (e) => {
    e.preventDefault();
    const newPokemon = {
      pokemonId: pokemon.id,
      nickname: nickname,
      imageUrl: pokemon.imageUrl
    }
    dispatch(catchPokemon(newPokemon, () => {
      navigate(`/mypokemon`)
    }));
  }
  
  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.wraper}>
        {notifFailed && <p className={classes.notifFailed}>Failed to Catch Pokemon</p>}
        {show && (
          <div className={classes.form}>
            <form onSubmit={catchHandler}>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              ></input>
              <button type='submit'>Submit</button>
            </form>
          </div>
        )}
        <div className={classes.content}>
          <div className={classes.card}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p className={classes.name}>{pokemon.name}</p>
          </div>
          <div className={classes.info}>
            <p>MOVES : {pokemon.moves}</p><br/>
            <p>TYPES : {pokemon.types}</p><br/>
            <p>ABILITES : {pokemon.abilities}</p>
          </div>
        </div>
        <div className={classes.btn_catch}>
          <button onClick={probability}>Catch Pokemon</button>
        </div>


      </div>
    </div>
  );
};

export default Detail;
