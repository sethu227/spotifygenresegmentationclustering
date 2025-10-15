import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Song from "./models/Song.js"; // Adjust path if needed

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spotifydb")
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

// Path to your clustered_songs.json
const filePath = path.join(process.cwd(), "data", "clustered_songs.json");

// Read raw JSON as string
let songsData = fs.readFileSync(filePath, "utf-8");

// Replace all NaN with null
songsData = songsData.replace(/\bNaN\b/g, "null");

// Parse JSON
const data = JSON.parse(songsData);

const seedDB = async () => {
  try {
    await Song.deleteMany({});
    // Insert the clusters array, not the entire object
    await Song.insertMany(data.clusters);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
