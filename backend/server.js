const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// GET all wrestlers (READ)
app.get('/api/wrestlers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM wrestlers');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new wrestler (CREATE)
app.post('/api/wrestlers', async (req, res) => {
  try {
    const { name, brand, description, image_url } = req.body;
    const [result] = await pool.query(
      'INSERT INTO wrestlers (name, brand, description, image_url) VALUES (?, ?, ?, ?)',
      [name, brand, description, image_url]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT/Edit a wrestler (UPDATE)
app.put('/api/wrestlers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, description, image_url } = req.body;
    await pool.query(
      'UPDATE wrestlers SET name = ?, brand = ?, description = ?, image_url = ? WHERE id = ?',
      [name, brand, description, image_url, id]
    );
    res.json({ message: 'Wrestler updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a wrestler (DELETE)
app.delete('/api/wrestlers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM wrestlers WHERE id = ?', [id]);
    res.json({ message: 'Wrestler deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`WWE Backend API listening on port ${port}`);
});