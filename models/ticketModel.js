import pool from '../db.js';

const ticketModel = {
  async findByEventId(eventId) {
    const query = `
      SELECT * FROM tickets
      WHERE event_id = $1
      ORDER BY section, row_number, seat_number::integer
    `;
    const result = await pool.query(query, [eventId]);
    return result.rows;
  },

  async findAvailableByEventId(eventId) {
    const query = `
      SELECT * FROM tickets
      WHERE event_id = $1 AND is_sold = false
      ORDER BY section, row_number, seat_number::integer
    `;
    const result = await pool.query(query, [eventId]);
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(ticketData) {
    const query = `
      INSERT INTO tickets (event_id, section, row_number, seat_number, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      ticketData.event_id,
      ticketData.section,
      ticketData.row_number,
      ticketData.seat_number,
      ticketData.price,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async markAsSold(ticketIds) {
    const query = `
      UPDATE tickets SET is_sold = true
      WHERE id = ANY($1)
      RETURNING *
    `;
    const result = await pool.query(query, [ticketIds]);
    return result.rows;
  },

  async update(id, ticketData) {
    const query = `
      UPDATE tickets
      SET section = $1, row_number = $2, seat_number = $3, price = $4
      WHERE id = $5
      RETURNING *
    `;
    const values = [
      ticketData.section,
      ticketData.row_number,
      ticketData.seat_number,
      ticketData.price,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

export default ticketModel;
