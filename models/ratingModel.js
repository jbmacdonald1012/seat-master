import pool from '../db.js';

const ratingModel = {
  async findByEventId(eventId) {
    const result = await pool.query('SELECT * FROM ratings WHERE event_id = $1', [eventId]);
    return result.rows;
  },

  async findByUserAndEvent(userId, eventId) {
    const result = await pool.query(
      'SELECT * FROM ratings WHERE user_id = $1 AND event_id = $2',
      [userId, eventId]
    );
    return result.rows[0];
  },

  async create(ratingData) {
    const query = `
      INSERT INTO ratings (event_id, user_id, rating)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [
      ratingData.event_id,
      ratingData.user_id,
      ratingData.rating,
    ]);
    return result.rows[0];
  },

  async update(id, rating) {
    const query = `
      UPDATE ratings
      SET rating = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [rating, id]);
    return result.rows[0];
  },

  async upsert(eventId, userId, rating) {
    const query = `
      INSERT INTO ratings (event_id, user_id, rating)
      VALUES ($1, $2, $3)
      ON CONFLICT (event_id, user_id)
      DO UPDATE SET rating = $3, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    const result = await pool.query(query, [eventId, userId, rating]);
    return result.rows[0];
  },
};

export default ratingModel;
