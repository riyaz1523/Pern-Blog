import express from 'express';
import { createComment, deleteComment, getCommentById, getComments, updateComment } from '../controllers/commentControler.js';


const router = express.Router();

router.get('/getComments', getComments);
router.get('/getCommentById/:id', getCommentById);
router.post('/createComment', createComment);
router.post('/updateComment/:id', updateComment);
router.delete('/deleteComment/:id', deleteComment);



export default router;
