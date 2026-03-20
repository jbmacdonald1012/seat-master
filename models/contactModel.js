import pool from '../db.js';

const contactModel = {
  async create(contactData) {
    const query = `
      INSERT INTO contact_messages (name, email, user_id, subject, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [
      contactData.name,
      contactData.email,
      contactData.user_id || null,
      contactData.subject,
      contactData.message,
    ]);
    return result.rows[0];
  },

  async getAll() {
    const query = `
      SELECT cm.*, u.username
      FROM contact_messages cm
      LEFT JOIN users u ON cm.user_id = u.id
      ORDER BY cm.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async findById(id) {
    const query = `
      SELECT cm.*, u.username
      FROM contact_messages cm
      LEFT JOIN users u ON cm.user_id = u.id
      WHERE cm.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async updateStatus(id, status) {
    const query = `
      UPDATE contact_messages
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  },

  async respond(id, adminResponse) {
    const query = `
      UPDATE contact_messages
      SET admin_response = $1, status = 'responded', updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [adminResponse, id]);
    return result.rows[0];
  },

  async findByStatus(status) {
    const query = 'SELECT * FROM contact_messages WHERE status = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [status]);
    return result.rows;
  },
};

export default contactModel;
