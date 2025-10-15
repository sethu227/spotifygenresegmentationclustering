import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import songsRouter from "./routes/songs.js";
import spotifyRouter from "./routes/spotify.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spotifydb")
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use("/api/songs", songsRouter);
app.use("/api/spotify", spotifyRouter);
app.listen(5000, () => console.log("Server running on port 5000"));