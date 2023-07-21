import React from "react";
import { Navigate } from "react-router-dom";
import { RedirectFunction } from "react-router-dom";
//import CountDown from "./Countdown";
import StartBtn from "./StartBtn";
import socket from "./socketConfig";

const findPlayer = (players) => {
  return players.find((player) => player.socketID === socket.id);
};
export const TypeRace = ({ gameState }) => {
  console.log(gameState);
  const { _id, players } = gameState;
  const player = findPlayer(players);
  console.log(player);
  //   if (_id === "") return <Navigate to="/" />; might need to uncomment this line later
  return (
    <>
      <div className="text-center">
        <h1>Hey it works</h1>
        {/* <StartBtn player={player} gameID={_id} /> */}
      </div>
    </>
  );
};
