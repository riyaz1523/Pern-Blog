import pool from '../db/index.js';
import { errorHandler } from '../utils/error.js';

export const getStories = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.title,
        s.content,
        s.image,
        s.created_at,
        s.read_time,
        COALESCE(COUNT(DISTINCT sl.user_id), 0) AS like_count,
        COALESCE(COUNT(DISTINCT c.id), 0) AS comment_count,
        u.username AS author_name,
        u.profile_picture AS author_picture
      FROM stories s
      LEFT JOIN users u ON s.author_id = u.id
      LEFT JOIN story_likes sl ON s.id = sl.story_id
      LEFT JOIN comments c ON s.id = c.story_id
      GROUP BY s.id, u.username, u.profile_picture
      ORDER BY s.created_at DESC;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};



export const getStoryById = async (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return next(errorHandler(400, 'Invalid ID format'));
  }

  try {
    // Query to get story details along with comments
    const result = await pool.query(`
      SELECT 
        stories.id,
        stories.title,
        stories.content AS description,
        stories.image,
        stories.created_at AS date,
        users.username AS author_name,
        users.profile_picture AS author_blogImg,
        users.email AS author_email,
        users.is_admin AS author_isAdmin,
        comments.id AS comment_id,
        comments.content AS comment_content,
        comments.created_at AS comment_date,
        comments.author_id AS comment_author_id,
        comment_authors.username AS comment_author_name,
        comment_authors.profile_picture AS comment_author_img
      FROM 
        stories
      LEFT JOIN 
        users ON stories.author_id = users.id
      LEFT JOIN 
        comments ON stories.id = comments.story_id
      LEFT JOIN 
        users AS comment_authors ON comments.author_id = comment_authors.id
      WHERE 
        stories.id = $1;
    `, [parseInt(id, 10)]);

    if (result.rows.length === 0) {
      return next(errorHandler(404, 'Story not found'));
    }

    const storyData = {
      ...result.rows[0],
      comments: result.rows
        .filter(row => row.comment_id) // Filter out rows that are not comments
        .map(row => ({
          id: row.comment_id,
          content: row.comment_content,
          createdAt: row.comment_date,
          author: {
            id: row.comment_author_id,
            name: row.comment_author_name,
            profileImg: row.comment_author_img,
          }
        }))
    };

    res.status(200).json(storyData);
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
