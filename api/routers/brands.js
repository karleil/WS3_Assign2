const express = require('express');
const db = require('../db'); 

const brandRouter = express.Router(); // router for handling routes related to brands

brandRouter.get('/', (req, res) => { // route to get all brands

    const sql = `SELECT * FROM brands`;  //sql query to select all data from the 'brands' table
  
    db.query(sql, (err, results) => { // executes the query

      if (err) {
        console.error(err);
        res.status(500).send('An error occurred'); // logs the error
      }
  
      res.json(results);
      
    });
});


brandRouter.post('/', (req, res) => { // route to add a new brand
    
    const { name } = req.body; // destructuring the name from the request body
  
    
    const addBrandSQL = `INSERT INTO brands (name) VALUES (?)`; // sql query to insert a new brand into the 'brands' table
  
    
    db.query(addBrandSQL, [name], (err, results) => {
  
      
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred');
      }
      
      res.json({ message: 'Brand added successfully', brandId: results.insertId });
    });
});

module.exports = brandRouter; // exports the the router to be used in other files
