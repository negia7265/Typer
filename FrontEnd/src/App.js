import "./App.css";
import history from "./history";

import { GameMenus } from "./components/GameMenus";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import socket from "./components/socketConfig";
import { useEffect, useState } from "react";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import { TypeRace } from "./components/TypeRacer";
//import TypeRace from "./components/TypeRacer";
function App() {
  const [gameState, setGameState] = useState({
    _id: "",
    isOpen: false,
    players: [],
    words: [],
  });
  useEffect(() => {
    socket.on("connection", (msg) => {});
    socket.on("updateGame", (game) => {
      console.log(game);
      setGameState(game);
      history.push(`/game/${game._id}`);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);
  useEffect(() => {
    if (gameState._id != "") {
      //may cause trouble ahead keep a check
      history.push(`/game/${gameState._id}`);
      //navigate(`/game/${gameState._id}`);
    }
  }, [gameState._id]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<GameMenus />} />
          <Route exact path="/game/create" element={<CreateGame />} />
          <Route exact path="/game/join" element={<JoinGame />} />
          {/* <Route
            path="/game/:gameID"
            element={<TypeRace gameState={gameState} />}
          /> */}
          <Route
            path="/game/:gameID"
            element={(props) => <TypeRace {...props} gameState={gameState} />}
          />
          {/* //Migh need to add props above */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
