import express from 'express';
import { likeComment, likeStory } from '../controllers/likeController.js';


const router = express.Router();

router.post('/likeStory', likeStory);
router.post('/likeComment', likeComment);




export default router;
