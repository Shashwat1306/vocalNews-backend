import express from 'express';
import { saveNews, getSavedNews, deleteSavedNews } from '../../controllers/saved-controller.js';

const router = express.Router();

router.post('/save', saveNews);
router.get('/get', getSavedNews);
router.delete('/delete/:id', deleteSavedNews);

export default router;