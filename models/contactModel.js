import pool from '../db.js';

const contactModel = {
  async create(contactData) {
    const query = `
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(query, [
      contactData.name,
      contactData.email,
      contactData.subject,
      contactData.message,
    ]);
    return result.rows[0];
  },

  async getAll() {
    const query = 'SELECT * FROM contact_messages ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query('SELECT * FROM contact_messages WHERE id = $1', [id]);
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
};

export default contactModel;
