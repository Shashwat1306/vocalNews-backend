import express from "express";
import multer from "multer";
import { recordAndTranscribe } from "../../controllers/deepgram-controller.js";

const router = express.Router();
const upload = multer();    
router.post("/transcribe", upload.single("file"), recordAndTranscribe);

export default router;