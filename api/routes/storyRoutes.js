import express from 'express';
import { createStory, deleteStory, getCurrentUserStories, getStories, getStoryById, updateStory } from '../controllers/storyController.js';
import { authUser } from '../middlewares/authUser.js';


const router = express.Router();

router.get('/getAllStories', getStories);
router.get('/myposts/:author_id',getCurrentUserStories);
router.get('/getStoryById/:id', getStoryById);
router.post('/createStory', createStory);
router.post('/updateStory/:id', updateStory);
router.post('/deleteStory/:id', deleteStory);


export default router;
