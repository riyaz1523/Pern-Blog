import pool from '../db/index.js';
import { errorHandler } from '../utils/error.js';

export const likeStory = async (req, res, next) => {
  const { story_id, user_id } = req.body;

  if (!story_id || !user_id) {
    return res.status(400).json({ error: "Missing story_id or user_id" });
  }

  try {
    // Check if the user already liked the story
    const checkResult = await pool.query(
      `SELECT * FROM story_likes WHERE story_id = $1 AND user_id = $2`,
      [story_id, user_id]
    );

    if (checkResult.rows.length > 0) {
      // Remove like
      await pool.query(
        `DELETE FROM story_likes WHERE story_id = $1 AND user_id = $2`,
        [story_id, user_id]
      );
      return res.status(200).json({ message: "Like removed" });
    } else {
      // Add like
      const result = await pool.query(
        `INSERT INTO story_likes (story_id, user_id)
         VALUES ($1, $2) RETURNING *`,
        [story_id, user_id]
      );
      return res.status(201).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

  
  

export const likeComment = async (req, res, next) => {
  const { comment_id, user_id } = req.body;

  if (!comment_id || !user_id) {
    return res.status(400).json({ error: "Missing comment_id or user_id" });
  }

  try {
    // Check if the user already liked the comment
    const checkResult = await pool.query(
      `SELECT * FROM comment_likes WHERE comment_id = $1 AND user_id = $2`,
      [comment_id, user_id]
    );

    if (checkResult.rows.length > 0) {
      // Remove like
      await pool.query(
        `DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2`,
        [comment_id, user_id]
      );
      return res.status(200).json({ message: "Like removed" });
    } else {
      // Add like
      const result = await pool.query(
        `INSERT INTO comment_likes (comment_id, user_id)
         VALUES ($1, $2) RETURNING *`,
        [comment_id, user_id]
      );
      return res.status(201).json(result.rows[0]);
    }
  } catch (error) {
    next(error);
  }
};

