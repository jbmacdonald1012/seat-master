import pool from '../db.js';

const commentModel = {
  async findByEventId(eventId) {
    const query = `
      SELECT c.*, u.username, u.full_name
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.event_id = $1
      ORDER BY c.created_at DESC
    `;
    const result = await pool.query(query, [eventId]);
    return result.rows;
  },

  async create(commentData) {
    const query = `
      INSERT INTO comments (event_id, user_id, comment_text)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [
      commentData.event_id,
      commentData.user_id,
      commentData.comment_text,
    ]);
    return result.rows[0];
  },

  async remove(id) {
    const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  },

  async flag(id) {
    const query = `
      UPDATE comments
      SET is_flagged = true, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

export default commentModel;
