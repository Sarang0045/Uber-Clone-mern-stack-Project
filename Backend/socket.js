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
    console.log(`[socket.io] Socket connected: ${socket.id}`);
    socket.on("join", async (data) => {
      const { userId, role } = data;
      if (role === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        console.log(`[socket.io] User joined: ${userId} (socket: ${socket.id})`);
      } else if (role === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        console.log(`[socket.io] Captain joined: ${userId} (socket: ${socket.id})`);
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!userId || !location || !location.ltd || !location.lng) {
        return socket.emit(error, "Invalid data provided for location update.");
      }
      try {
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            ltd: location.ltd,
            lng: location.lng,
          },
        });
        console.log(`[socket.io] Updated captain location: ${userId}`, location);
      } catch (error) {
        console.error("[socket.io] Error updating captain location:", error);
      }
    });

    socket.on("disconnect", () => {
      sockets.delete(socket.id);
      console.log(`[socket.io] Socket disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log("[socket.io] Sending message to socket:", socketId, messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("[socket.io] Socket.io not initialized.");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
