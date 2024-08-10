import pool from '../db/index.js'; 
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
  console.log('req.user:', req.user); // Debugging line
  console.log('req.params.id:', req.params.id); // Debugging line

  if (req.user.id !== parseInt(req.params.id, 10)) {
    return next(errorHandler(401, 'You can update only your account!'));
  }

  const { username, email, password, profile_picture } = req.body;
  const updateValues = [];
  const queryParams = [];

  if (username !== undefined) {
    queryParams.push(username);
    updateValues.push(`username = $${queryParams.length}`);
  }

  if (email !== undefined) {
    queryParams.push(email);
    updateValues.push(`email = $${queryParams.length}`);
  }

  if (password !== undefined && password !== '') {
    queryParams.push(bcryptjs.hashSync(password, 10));
    updateValues.push(`password = $${queryParams.length}`);
  }

  if (profile_picture !== undefined) {
    queryParams.push(profile_picture);
    updateValues.push(`profile_picture = $${queryParams.length}`);
  }

  if (updateValues.length === 0) {
    return res.status(400).json({ success: false, message: 'No fields to update' });
  }

  try {
    const result = await pool.query(
      `UPDATE users
       SET ${updateValues.join(', ')}
       WHERE id = $${queryParams.length + 1}
       RETURNING *`,
      [...queryParams, req.params.id]
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
