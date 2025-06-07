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
      } catch (error) {
        console.error("Error updating captain location:", error);
      }
    });

    socket.on("disconnect", () => {
      sockets.delete(socket.id);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
