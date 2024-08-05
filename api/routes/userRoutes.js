import express from 'express';
import { authUser } from '../middlewares/authUser.js';
import { deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/update/:id', authUser, updateUser);
router.delete('/delete/:id', authUser, deleteUser);

export default router;