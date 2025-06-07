const { Server } = require("socket.io");
const userModel = require("./models/userModel");
const captainModel = require("./models/captainModel");

let io = null;
const sockets = new Map();

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    sockets.set(socket.id, socket);
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, role } = data;
      if (role === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (role === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("disconnect", () => {
      sockets.delete(socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, event, data) {
  if (io && sockets.has(socketId)) {
    sockets.get(socketId).emit(event, data);
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
