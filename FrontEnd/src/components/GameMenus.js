import React from "react";
import { useNavigate } from "react-router-dom";
export const GameMenus = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1>Welcome to Type Racer Clone</h1>
      <button
        className="btn btn-primary btn-lg m-3"
        onClick={() => navigate("/game/create")}
        type="button"
      >
        Create Game
      </button>
      <button
        className="btn btn-primary btn-lg m-3"
        onClick={() => navigate("/game/join")}
        type="button"
      >
        Join
      </button>
    </div>
  );
};
