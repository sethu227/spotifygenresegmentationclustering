import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
  danceability: Number, energy: Number, loudness: Number,
  speechiness: Number, acousticness: Number, instrumentalness: Number,
  liveness: Number, valence: Number, tempo: Number
},{ _id:false });

const SongSchema = new mongoose.Schema({
  track_id: String, track_name: String, artist_name: String, playlist_genre: String,
  playlist_name: String, features: FeatureSchema, cluster: Number
});
export default mongoose.model("Song", SongSchema);