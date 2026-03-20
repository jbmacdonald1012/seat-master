import pool from '../db.js';

const purchaseModel = {
  async create(purchaseData) {
    const query = `
      INSERT INTO purchases (user_id, event_id, ticket_ids, quantity, total_price, status, payment_method, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      purchaseData.user_id,
      purchaseData.event_id,
      purchaseData.ticket_ids,
      purchaseData.quantity,
      purchaseData.total_price,
      purchaseData.status || 'pending',
      purchaseData.payment_method,
      purchaseData.notes,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findById(id) {
    const query = `
      SELECT p.*,
             u.username, u.email, u.full_name,
             e.title as event_title, e.venue_name, e.event_date, e.image_url
      FROM purchases p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN events e ON p.event_id = e.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async findByUserId(userId) {
    const query = `
      SELECT p.*,
             e.title as event_title, e.venue_name, e.event_date, e.image_url
      FROM purchases p
      LEFT JOIN events e ON p.event_id = e.id
      WHERE p.user_id = $1
      ORDER BY p.purchase_date DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async getAll() {
    const query = `
      SELECT p.*,
             u.username, u.email, u.full_name,
             e.title as event_title, e.venue_name, e.event_date
      FROM purchases p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN events e ON p.event_id = e.id
      ORDER BY p.purchase_date DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async updateStatus(id, status) {
    const query = `
      UPDATE purchases
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  },
};

export default purchaseModel;
