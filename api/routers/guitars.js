// imports the .env file
require('dotenv').config();
const express = require('express');
const db = require('../db');
const upload = require('../storage');
const authenticateToken = require("../auth.jwt");

const guitarsRouter = express.Router();

guitarsRouter.use(authenticateToken); // this will run the authenticateToken function on every route in this file

guitarsRouter.get('/', (req, res) => { // Gets all the guitar from the database

  const brands = req.query.brands; // this pulls the brands from the query string

  const user_id = req.user.userId; // this pulls the user id from the auth function

  let sql = `
    SELECT guitars.*, brands.name AS brand, brands.id AS brand_id
    FROM guitars
    JOIN brands ON guitars.brand_id = brands.id WHERE `;

  const queryParams = []; // this is an array that will hold the query parameters depending on the query string

  // this checks if there is a brand in the query string
  if (brands) {

    // if there is, pass it in here
    sql += `brands.id IN (?) AND `;

    // if its an array, add each brand to the array
    if (Array.isArray(brands)) {
      queryParams.push(...brands);

    // if its a number, addd to the array
    } else {
      queryParams.push(brands);
    }
  }

  // this adds the user id to the query
  sql += `guitars.user_id = ?`;

  // this adds the user id to the array
  queryParams.push(user_id);

  //this runs the query above
  db.query(sql, queryParams, (err, results) => {

    // logs an error if there is one
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }

    // sends the results back to the client
    res.json(results);
  });
});

// this route gets a single guitar from the database
guitarsRouter.get('/:id', (req, res) => {

  const { id } = req.params;

  // this pulls the user id from the auth function
  const user_id = req.user.userId;

  // sql for one guitar
  const sql = `
    SELECT guitars.*, brands.name AS brand, brands.id AS brand_id
    FROM guitars
    JOIN brands ON guitars.brand_id = brands.id
    WHERE guitars.id = ? AND guitars.user_id = ?`;

  // this substitutes the ? with the id and user id
  db.query(sql, [id, user_id], (err, results) => {

    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }

    res.json(results[0]);
  });
});

// delete a guitar from the database
guitarsRouter.delete("/:id", (req, res) => {

  const { id } = req.params;

  // this pulls the user id from the auth function
  const user_id = req.user.userId;

  // query to delete the guitar
  const sql = `DELETE FROM guitars WHERE id = ? AND user_id = ? LIMIT 1`;

  // same as above
  db.query(sql, [id, user_id], (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.json({ message: "Guitar Deleted" });
  });
});

// updates a guitar in the database
guitarsRouter.put('/:id', upload.single('image'), (req, res) => {

  // this pulls the id from the request params
  const { id } = req.params;
  const user_id = req.user.userId;

  // this pulls the name, description, and brand id from the request body
  const { name, description, brand_id } = req.body;


  let updateGuitarSQL = `
    UPDATE guitars
    SET name = ?, brand_id = ?, description = ?
  `;

  const queryParams = [name, brand_id, description];

  //this checks if there is an image in the request  
  if (req.file) {
    updateGuitarSQL += `, image_name = ?`;
    queryParams.push(req.file.filename);
  }

  // this checks if there is a brand in the request
  updateGuitarSQL += ` WHERE id = ? AND user_id = ? LIMIT 1`;
  queryParams.push(id);
  queryParams.push(user_id); // this adds the user id to the array

  console.log(queryParams);

  // this is the same as above
  db.query(updateGuitarSQL, queryParams, (err, results) => {

    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }

    res.json({ message: 'Guitar updated successfully' });
  });
});

// adds a guitar to the database
guitarsRouter.post('/', upload.single('image'), (req, res) => {

  // this gets the brand id, name, and description from the request body
  const { brand_id, name, description } = req.body;

  const user_id = req.user.userId; // this pulls the user id from the auth function

  // this is the file's filename store in req.dile.filename
  const image = req.file.filename;

  // sql to add a guitar
  const addGuitarSQL = `INSERT INTO guitars (brand_id, name, description, image_name, user_id) VALUES (?, ?, ?, ?, ?)`;

  // Rsame as above
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