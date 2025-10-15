import express from "express";
import { getTrackPreview, getMultipleTrackPreviews } from "../controllers/spotifyController.js";

const router = express.Router();

router.get("/track/:trackId", getTrackPreview);
router.post("/tracks", getMultipleTrackPreviews);

export default router;
