import express from "express";
import http from "http"; // Add this import
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import blogsRoutes from "./routes/blogs.route.js";
import { initializeSocket } from "./lib/socket.js"; // Fixed import

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);

initializeSocket(server);

app.use(express.json()); // Middleware to extract data from the json body
app.use(cookieParser()); // Allow us to parse the cookies and get the values out of it
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Change this to server.listen
server.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDB();
});
