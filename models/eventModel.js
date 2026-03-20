import pool from '../db.js';

const eventModel = {
  async getAllEvents(limit = null, offset = 0) {
    let query = `
      SELECT e.*, c.name as category_name, c.slug as category_slug,
             COALESCE(AVG(r.rating), 0) as avg_rating,
             COUNT(DISTINCT r.id) as rating_count
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN ratings r ON e.id = r.event_id
      WHERE e.is_active = true
      GROUP BY e.id, c.name, c.slug, e.event_date
      ORDER BY e.event_date
    `;
    const params = [];
    if (limit) {
      query += ` LIMIT $1 OFFSET $2`;
      params.push(limit, offset);
    }
    const result = await pool.query(query, params);
    return result.rows;
  },

  async getFeaturedEvents(limit = 6) {
    const query = `
      SELECT e.*, c.name as category_name, c.slug as category_slug,
             COALESCE(AVG(r.rating), 0) as avg_rating,
             COUNT(DISTINCT r.id) as rating_count
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN ratings r ON e.id = r.event_id
      WHERE e.is_featured = true AND e.is_active = true
      GROUP BY e.id, c.name, c.slug, e.event_date
      ORDER BY e.event_date
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  },

  async getEventById(id) {
    const query = `
      SELECT e.*, c.name as category_name, c.slug as category_slug,
             COALESCE(AVG(r.rating), 0) as avg_rating,
             COUNT(DISTINCT r.id) as rating_count
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN ratings r ON e.id = r.event_id
      WHERE e.id = $1
      GROUP BY e.id, c.name, c.slug
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async getEventsByCategory(categoryId, limit = null) {
    let query = `
      SELECT e.*, c.name as category_name, c.slug as category_slug,
             COALESCE(AVG(r.rating), 0) as avg_rating,
             COUNT(DISTINCT r.id) as rating_count
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN ratings r ON e.id = r.event_id
      WHERE e.category_id = $1 AND e.is_active = true
      GROUP BY e.id, c.name, c.slug, e.event_date
      ORDER BY e.event_date
    `;
    const params = [categoryId];
    if (limit) {
      query += ` LIMIT $2`;
      params.push(limit);
    }
    const result = await pool.query(query, params);
    return result.rows;
  },

  async searchEvents(searchTerm) {
    const query = `
      SELECT e.*, c.name as category_name, c.slug as category_slug,
             COALESCE(AVG(r.rating), 0) as avg_rating,
             COUNT(DISTINCT r.id) as rating_count
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN ratings r ON e.id = r.event_id
      WHERE e.is_active = true
        AND (
          LOWER(e.title) LIKE LOWER($1) OR
          LOWER(e.description) LIKE LOWER($1) OR
          LOWER(e.venue_name) LIKE LOWER($1) OR
          LOWER(e.city) LIKE LOWER($1)
        )
      GROUP BY e.id, c.name, c.slug, e.event_date
      ORDER BY e.event_date
    `;
    const result = await pool.query(query, [`%${searchTerm}%`]);
    return result.rows;
  },

  async createEvent(eventData) {
    const query = `
      INSERT INTO events (
        title, description, category_id, venue_name, venue_address,
        city, state, event_date, image_url, total_tickets,
        available_tickets, base_price, cost_per_ticket, is_featured
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;
    const values = [
      eventData.title,
      eventData.description,
      eventData.category_id,
      eventData.venue_name,
      eventData.venue_address,
      eventData.city,
      eventData.state,
      eventData.event_date,
      eventData.image_url,
      eventData.total_tickets,
      eventData.available_tickets,
      eventData.base_price,
      eventData.cost_per_ticket || 0,
      eventData.is_featured || false,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async updateEvent(id, eventData) {
    const query = `
      UPDATE events
      SET title = $1, description = $2, category_id = $3, venue_name = $4,
          venue_address = $5, city = $6, state = $7, event_date = $8,
          image_url = $9, base_price = $10, cost_per_ticket = $11,
          is_featured = $12, is_active = $13,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $14
      RETURNING *
    `;
    const values = [
      eventData.title,
      eventData.description,
      eventData.category_id,
      eventData.venue_name,
      eventData.venue_address,
      eventData.city,
      eventData.state,
      eventData.event_date,
      eventData.image_url,
      eventData.base_price,
      eventData.cost_per_ticket || 0,
      eventData.is_featured,
      eventData.is_active,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async deleteEvent(id) {
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  },

  async updateAvailableTickets(eventId, quantity) {
    const query = `
      UPDATE events
      SET available_tickets = available_tickets - $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [quantity, eventId]);
    return result.rows[0];
  },
};

export default eventModel;
