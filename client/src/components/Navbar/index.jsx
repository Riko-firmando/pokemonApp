import React from "react";
import classes from "./index.module.scss";
import { useNavigate, Link } from "react-router-dom";
import Pokemon from "../../assets/icon/LOGO_2.png";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <img
        className={classes.title}
        onClick={() => navigate("/")}
        src={Pokemon}
        alt="pokemon"
      />
      <div className={classes.navigasi} id="navigasi">
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>Dashboard</span>
          </Link>
        </div>
        <div>
          <Link to="/mypokemon" style={{ textDecoration: "none" }}>
            <span>My Pokemons</span>
          </Link>
        </div>
      </div>
      <div className={classes.humbergerMenu}>
        <input
          className={classes.check}
          type="checkbox"
          onClick={(e) => {
            if (e.target.checked == true) {
              setTimeout(() => {
                document.getElementById("navigasi").style.display = "flex";
                document.getElementById("navigasi").style.transform =
                  "translateX(0px)";
              }, 100);
            } else {
              document.getElementById("navigasi").style.transform =
                "translateX(153px)";
              setTimeout(() => {
                document.getElementById("navigasi").style.display = "none";
              }, 100);
            }
          }}
        />
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
