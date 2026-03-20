import pool from '../db.js';
import bcrypt from 'bcrypt';

const userModel = {
  async createUser(username, email, password, fullName, role = 'customer') {
    const passwordHash = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password_hash, full_name, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, full_name, role, created_at
    `;
    const result = await pool.query(query, [username, email, passwordHash, fullName, role]);
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },

  async findById(id) {
    const query = 'SELECT id, username, email, full_name, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  async getAllUsers() {
    const query = 'SELECT id, username, email, full_name, role, created_at FROM users ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  async updateUserRole(userId, newRole) {
    const query = `
      UPDATE users
      SET role = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, username, email, full_name, role
    `;
    const result = await pool.query(query, [newRole, userId]);
    return result.rows[0];
  },

  async deleteUser(userId) {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
    return result.rows[0];
  },
};

export default userModel;
