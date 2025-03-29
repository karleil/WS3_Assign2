const express = require('express');
const db = require('../db'); 

const brandRouter = express.Router();

brandRouter.get('/', (req, res) => {

    const sql = `SELECT * FROM brand`;
  
    db.query(sql, (err, results) => {

      if (err) {
        console.error(err);
        res.status(500).send('An error occurred');
      }
  
      res.json(results);
      
    });
});

// Handle POST requests to add a new brand
brandRouter.post('/', (req, res) => {
    // Get the new brand name from the request body
    const { name } = req.body;
  
    // Create the SQL query to insert the new brand
    const addBrandSQL = `INSERT INTO brand (name) VALUES (?)`;
  
    // Execute the SQL query, but substitute the '?' with the new brand name
    db.query(addBrandSQL, [name], (err, results) => {
  
      // If an error occurred, log it and return a 500 status code
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred');
      }
      // If the query was successful, return a JSON response with the new brand ID to be used later
      res.json({ message: 'Brand added successfully', brandId: results.insertId });
    });
});

module.exports = brandRouter;
