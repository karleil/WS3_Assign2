const express = require('express');
const db = require('../db');
const upload = require('../storage');

const guitarsRouter = express.Router(); // router for handling routes related to brands


guitarsRouter.get('/', (req, res) => { // route to get all guitars
  const sql = `SELECT * FROM guitars`; //sql query to select all data from the 'guitars' table

  db.query(sql, (err, results) => { // executes the query
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred'); // logs the error
    }
    res.json(results);
  });
});


guitarsRouter.get('/:id', (req, res) => { // route to get a specific guitar by id
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


guitarsRouter.delete('/:id', (req, res) => { // route to delete a specific guitar by id
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


guitarsRouter.put('/:id', upload.single('image'), (req, res) => { // route to update a specific guitar by id
  const { id } = req.params;
  const { name, description, guitar_id } = req.body;

  let updateGuitarSQL = `UPDATE guitars SET name = ?, description = ?, guitar_id = ?`; // sql query to update the guitar
  const queryParams = [name, description, guitar_id]; // parameters for the query

  if (req.file) { // if an image is uploaded, add it to the query
    updateGuitarSQL += `, image_name = ?`;
    queryParams.push(req.file.filename);  
  }

  updateGuitarSQL += ` WHERE id = ? LIMIT 1`; // add the condition to update the specific guitar
  queryParams.push(id); 

  db.query(updateGuitarSQL, queryParams, (err, results) => { // executes the query
    if (err) { 
      console.error(err);
      return res.status(500).send('An error occurred'); // returns an error response if an error occurs
    }
    res.json({ message: 'Guitar updated successfully' }); 
  });
});


guitarsRouter.post('/', upload.single('image'), (req, res) => { // route to add a new guitar
  const { guitar_id, name, description } = req.body; 
  const image = req.file ? req.file.filename : null;
  const sql = `INSERT INTO guitars (brand_id, name, description, image_name) VALUES (?, ?, ?, ?)`; // sql query to insert a new guitar into the guitars table

  db.query(sql, [guitar_id, name, description, image], (err, results) => { // executes the query
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred'); // returns an error response if an error occurs
    }
    res.json({ message: 'Guitar added successfully' }); 
  });
});

module.exports = guitarsRouter; // exports the router to be used in other files
