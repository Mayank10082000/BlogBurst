import { Server } from "socket.io";

let io;

// Initialize socket.io with HTTP server
export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin:
        process.env.NODE_ENV === "development"
          ? "http://localhost:51730"
          : true,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    // Handle Disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });

  return io;
};

export const emitNewBlog = (blog) => {
  if (!io) {
    console.error("Socket.io is not initialized");
    return;
  }
  io.emit("blogCreated", blog);
};

export const emitBlogUpdate = (blog) => {
  if (!io) {
    console.error("Socket.io is not initialized");
    return;
  }
  io.emit("blogUpdated", blog);
};

export const emitBlogDelete = (blogId) => {
  if (!io) {
    console.error("Socket.io is not initialized");
    return;
  }
  io.emit("blogDeleted", blogId);
};
