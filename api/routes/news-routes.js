import express from 'express';
import { convertNewsToAudio } from '../../controllers/news-controller.js';
import { convertLatestNewsToAudio } from '../../controllers/news-controller.js';
const router = express.Router();

router.post("/convert",convertNewsToAudio);
router.post("/latest", convertLatestNewsToAudio);
export default router;