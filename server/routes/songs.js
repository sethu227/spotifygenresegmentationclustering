import express from "express";
import { getAllSongs, getSongsByCluster, getClusterCounts } from "../controllers/songController.js";
const router = express.Router();
router.get("/", getAllSongs);
router.get("/cluster/:id", getSongsByCluster);
router.get("/counts", getClusterCounts);
export default router;