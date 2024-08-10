import pool from '../db/index.js';
import { errorHandler } from '../utils/error.js';


export const getCommentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT comments.*, users.profile_picture, users.name
      FROM comments
      JOIN users ON comments.author_id = users.id
      WHERE comments.id = $1
    `, [id]);
    if (result.rows.length === 0) {
      return next(errorHandler(404, 'Comment not found'));
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT comments.*, users.profile_picture, users.username
      FROM comments
      JOIN users ON comments.author_id = users.id
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};


export const createComment = async (req, res, next) => {
  const { story_id, content, author_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO comments (story_id, content, author_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [story_id, content, author_id]
    );
    const newComment = result.rows[0];

    // Fetch user details
    const userResult = await pool.query('SELECT profile_picture, username FROM users WHERE id = $1', [author_id]);
    newComment.author = userResult.rows[0];

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};



export const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { content, like_count, star } = req.body;
  try {
    const result = await pool.query(
      `UPDATE comments
       SET content = $1,
           like_count = $2,
           star = $3
       WHERE id = $4
       RETURNING *`,
      [content, like_count, star, id]
    );
    if (result.rows.length === 0) {
      return next(errorHandler(404, 'Comment not found'));
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return next(errorHandler(404, 'Comment not found'));
    }
    res.status(200).json('Comment has been deleted');
  } catch (error) {
    next(error);
  }
};
