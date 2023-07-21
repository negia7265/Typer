const express = require("express");
const app = express();

//const socketio = require("socket.io");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
//const io = new Server(httpServer);

const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const Game = require("./models/Game");
const QuotableAPI = require("./QuotableAPI");

//Database Connection
mongoose.set("strictQuery", false);
const uri =
  "mongodb+srv://negia7265:7300789205@cluster0.ws32dt9.mongodb.net/KeepersApp?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(uri, options)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

const expressServer = app.listen(3001, () => {
  console.log("Listening on port 3001");
});
const io = new Server(expressServer, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  console.log("working");
  socket.on("join-game", async ({ gameID: _id, nickName }) => {
    try {
      let game = await Game.findById(_id);
      if (game.isOpen) {
        const gameID = game._id.toString();
        socket.join(gameID);
        let player = {
          socketID: socket.id,
          nickName,
        };
        game.players.push(player);
        game = await game.save();
        io.to(gameID).emit("updateGame", game);
      }
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("create-game", async (nickName) => {
    try {
      const quotableData = await QuotableAPI();
      let game = new Game();
      game.words = quotableData.data;
      let player = {
        socketID: socket.id,
        isPartyLeader: true,
        nickName,
      };
      game.players.push(player);
      game = await game.save();
      const gameID = game._id.toString();
      socket.join(gameID);
      io.to(gameID).emit("updateGame", game);
    } catch (err) {
      console.log(err);
    }
  });

  // socket.emit("test", "this is from server");
  // socket.emit("patriot", "this is again from server");
});
