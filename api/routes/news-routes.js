import express from 'express';
import { convertNewsToAudio } from '../../controllers/news-controller.js';
const router = express.Router();

router.post("/convert",convertNewsToAudio);
export default router;