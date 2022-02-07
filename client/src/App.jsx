import "./App.module.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Detail, MyPokemons } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Detail />} />
          <Route path="/mypokemon" element={<MyPokemons />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
