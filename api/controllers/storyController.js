import pool from '../db/index.js';
import { errorHandler } from '../utils/error.js';

export const getStories = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM stories');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getStoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM stories WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return next(errorHandler(404, 'Story not found'));
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createStory = async (req, res, next) => {
    const { author_id, slug, title, content, image, read_time, like_count, comment_count } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO stories (author_id, slug, title, content, image, read_time, like_count, comment_count)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [author_id, slug, title, content, image, read_time, like_count, comment_count]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
};


export const updateStory = async (req, res, next) => {
  const { id } = req.params;
  const { slug, title, content, image, read_time, like_count, comment_count } = req.body;
  try {
    const result = await pool.query(
      `UPDATE stories
       SET slug = $1,
           title = $2,
           content = $3,
           image = $4,
           read_time = $5,
           like_count = $6,
           comment_count = $7
       WHERE id = $8
       RETURNING *`,
      [slug, title, content, image, read_time, like_count, comment_count, id]
    );
    if (result.rows.length === 0) {
      return next(errorHandler(404, 'Story not found'));
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteStory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM stories WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return next(errorHandler(404, 'Story not found'));
    }
    res.status(200).json('Story has been deleted');
  } catch (error) {
    next(error);
  }
};
