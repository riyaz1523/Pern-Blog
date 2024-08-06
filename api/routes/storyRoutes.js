import express from 'express';
import { createStory, deleteStory, getStories, getStoryById, updateStory } from '../controllers/storyController.js';


const router = express.Router();

router.get('/getAllStories', getStories);
router.get('/getStoryById/:id', getStoryById);
router.post('/createStory', createStory);
router.post('/updateStory/:id', updateStory);
router.post('/deleteStory/:id', deleteStory);


export default router;
