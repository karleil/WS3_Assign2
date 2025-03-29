const express = require('express');
const db = require('../db');
const upload = require('../storage');

const guitarsRouter = express.Router();

// Get all guitars from the database
guitarsRouter.get('/', (req, res) => {
  const sql = `SELECT * FROM guitars`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
    res.json(results);
  });
});

// Get a single guitar from the database
guitarsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM guitars WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
    res.json(results[0]);
  });
});

// Delete a guitar
guitarsRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM guitars WHERE id = ? LIMIT 1`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    res.json({ message: 'Guitar Deleted' });
  });
});

// Update a guitar
guitarsRouter.put('/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description, guitar_id } = req.body;

  let updateGuitarSQL = `UPDATE guitars SET name = ?, description = ?, guitar_id = ?`;
  const queryParams = [name, description, guitar_id];

  if (req.file) {
    updateGuitarSQL += `, image_name = ?`;
    queryParams.push(req.file.filename);
  }

  updateGuitarSQL += ` WHERE id = ? LIMIT 1`;
  queryParams.push(id);

  db.query(updateGuitarSQL, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.json({ message: 'Guitar updated successfully' });
  });
});

// Add a new guitar
guitarsRouter.post('/', upload.single('image'), (req, res) => {
  const { guitar_id, name, description } = req.body;
  const image = req.file ? req.file.filename : null;
  const sql = `INSERT INTO guitars (guitar_id, name, description, image_name) VALUES (?, ?, ?, ?)`;

  db.query(sql, [guitar_id, name, description, image], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.json({ message: 'Guitar added successfully' });
  });
});

module.exports = guitarsRouter;
