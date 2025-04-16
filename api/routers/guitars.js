// Import the .env file variables
require('dotenv').config();

const express = require('express');
const db = require('../db');
const upload = require('../storage');
// Import the authentication file
const authenticateToken = require("../auth.jwt");

const guitarsRouter = express.Router();

// Use the auth protection on all routers
guitarsRouter.use(authenticateToken);

// Get all guitars from the database
guitarsRouter.get('/', (req, res) => {

  // Pull the brand from the query Example: /guitars?brands=1
  const brands = req.query.brands;

  // user property is attached in "../auth.jwt.js"
  const user_id = req.user.userId;

  // This is the basic query using a JOIN for a guitar
  let sql = `
    SELECT guitars.*, brands.name AS brand, brands.id AS brand_id
    FROM guitars
    JOIN brands ON guitars.brand_id = brands.id WHERE `;

  // Here we are using a queryParam array because we conditionally push to it depending on if there is the brand param or not
  const queryParams = [];

  // Check if the query param exists
  if (brands) {

    // If it does, pass it in here
    sql += `brands.id IN (?) AND `;

    // If it's an array, add each as an item to query params
    if (Array.isArray(brands)) {
      queryParams.push(...brands);

    // If it's just a number, just add it to the array
    } else {
      queryParams.push(brands);
    }
  }

  // Add the logged-in user to the SQL query
  sql += `guitars.user_id = ?`;

  // Push the value onto the end
  queryParams.push(user_id);

  // Run the SQL above, subbing the parameters
  db.query(sql, queryParams, (err, results) => {

    // If there is an error, log it
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }

    // Send the results back
    res.json(results);
  });
});

// Get a single guitar from the database
guitarsRouter.get('/:id', (req, res) => {

  // Get the id from the URL
  const { id } = req.params;

  // Get the user that was attached in the auth function
  const user_id = req.user.userId;

  // SQL for one guitar
  const sql = `
    SELECT guitars.*, brands.name AS brand, brands.id AS brand_id
    FROM guitars
    JOIN brands ON guitars.brand_id = brands.id
    WHERE guitars.id = ? AND guitars.user_id = ?`;

  // Substitute the '?' with the id from the URL to prevent SQL injection
  db.query(sql, [id, user_id], (err, results) => {

    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }

    res.json(results[0]);
  });
});

// Delete a guitar from the database
guitarsRouter.delete("/:id", (req, res) => {

  // Get the id from the URL placeholder here
  const { id } = req.params;

  // Get the user_id from the auth function
  const user_id = req.user.userId;

  // SQL Query to delete the guitar
  const sql = `DELETE FROM guitars WHERE id = ? AND user_id = ? LIMIT 1`;

  // Run the above 
  db.query(sql, [id, user_id], (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }

    // Send the response back to redirect
    res.json({ message: "Guitar Deleted" });
  });
});

// Update a guitar entry in the database
guitarsRouter.put('/:id', upload.single('image'), (req, res) => {

  // Get the id from the URL
  const { id } = req.params;
  const user_id = req.user.userId;

  // Get the name and brand ID from the request body
  const { name, description, brand_id } = req.body;

  // @NOTE: We are breaking the SQL query into multiple concatenated strings for readability to only add the image_name if a file was uploaded

  let updateGuitarSQL = `
    UPDATE guitars
    SET name = ?, brand_id = ?, description = ?
  `;

  const queryParams = [name, brand_id, description];

  // The file property will only return truthy if a file was uploaded
  if (req.file) {
    updateGuitarSQL += `, image_name = ?`;
    queryParams.push(req.file.filename);
  }

  // Finish the SQL query by adding the WHERE clause to only update the guitar with the matching ID
  updateGuitarSQL += ` WHERE id = ? AND user_id = ? LIMIT 1`;
  queryParams.push(id);
  queryParams.push(user_id);

  console.log(queryParams);

  // Run the query above, substituting the '?' with the name, brand ID, image (if uploaded), and ID in that order
  db.query(updateGuitarSQL, queryParams, (err, results) => {

    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    res.json({ message: 'Guitar updated successfully' });
  });
});

// Add a new guitar to the database after uploading an image that was sent in the request
guitarsRouter.post('/', upload.single('image'), (req, res) => {

  // Get the brand ID and name from the request body 
  const { brand_id, name, description } = req.body;

  const user_id = req.user.userId;

  // The uploaded file's filename is stored in 'req.file.filename'
  const image = req.file.filename;

  // Create the SQL query to insert the new guitar
  const addGuitarSQL = `INSERT INTO guitars (brand_id, name, description, image_name, user_id) VALUES (?, ?, ?, ?, ?)`;

  // Run the query above, substituting the '?' with the brand ID, name, and image in that order
  db.query(addGuitarSQL, [brand_id, name, description, image, user_id], (err, results) => {

    // If an error occurred, log it and return a 500 status code
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    res.json({ message: 'Guitar added successfully' });
  });
});

module.exports = guitarsRouter;