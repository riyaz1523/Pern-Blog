import pg from 'pg';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/index.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    client.release();
    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (error) {
    next(error);
  }
};



export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const validUser = rows[0];
    if (!validUser) return next(errorHandler(404, 'User not found'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};



function errorHandler(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
