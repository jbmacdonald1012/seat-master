import pool from '../db.js';

const categoryModel = {
  async getAllCategories() {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
  },

  async getCategoryById(id) {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  },

  async getCategoryBySlug(slug) {
    const result = await pool.query('SELECT * FROM categories WHERE slug = $1', [slug]);
    return result.rows[0];
  },

  async createCategory(name, slug, description) {
    const query = `
      INSERT INTO categories (name, slug, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [name, slug, description]);
    return result.rows[0];
  },

  async updateCategory(id, name, slug, description) {
    const query = `
      UPDATE categories
      SET name = $1, slug = $2, description = $3
      WHERE id = $4
      RETURNING *
    `;
    const result = await pool.query(query, [name, slug, description, id]);
    return result.rows[0];
  },

  async deleteCategory(id) {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  },

  async getEventCountByCategory(categoryId) {
    const query = 'SELECT COUNT(*) as count FROM events WHERE category_id = $1 AND is_active = true';
    const result = await pool.query(query, [categoryId]);
    return parseInt(result.rows[0].count);
  },
};

export default categoryModel;
