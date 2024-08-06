import pool from '../db/index.js';
import { errorHandler } from '../utils/error.js';

export const getComments = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM comments');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getCommentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return next(errorHandler(404, 'Comment not found'));
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  const { story_id, content, author_id, like_count, star } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO comments (story_id, content, author_id, like_count, star)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [story_id, content, author_id, like_count, star]
    );
    res.status(201).json(result.rows[0]);
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
