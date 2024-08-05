import pool from '../db/index.js'; 
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
    console.log('req.user:', req.user); // Debugging line
    console.log('req.params.id:', req.params.id); // Debugging line
  
    if (req.user.id !== parseInt(req.params.id, 10)) {
      return next(errorHandler(401, 'You can update only your account!'));
    }
  
    const { username, email, password, profilePicture } = req.body;
  
    try {
      let updatedPassword = null;
      if (password) {
        updatedPassword = bcryptjs.hashSync(password, 10);
      }
  
      const result = await pool.query(
        `UPDATE users
         SET username = $1,
             email = $2,
             password = $3,
             profile_picture = $4
         WHERE id = $5
         RETURNING *`,
        [username, email, updatedPassword, profilePicture, req.params.id]
      );
  
      const updatedUser = result.rows[0];
      const { password: hashedPassword, ...rest } = updatedUser;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  
  



export const deleteUser = async (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id, 10)) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }

  try {
    await pool.query(
      `DELETE FROM users
       WHERE id = $1`,
      [req.params.id]
    );

    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
};
