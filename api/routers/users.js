require("dotenv").config(); // this imports the .env file
const express = require("express");
const { body, validationResult } = require("express-validator"); // this imports the express-validator package to validate the request body
const bcrypt = require("bcrypt"); // this imports the bcrypt to hashh the password
const jwt = require("jsonwebtoken"); // this imports the jsonwebtoken to create a token
const db = require("../db"); 

const JWT_SECRET = process.env.JWT_SECRET; // this imports the secret key from the .env file

const usersRouter = express.Router(); // this creates a new router for the users

usersRouter.post("/", [ // this is the route to create a new user
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    body("password").isLength( { min: 8 } ).withMessage("Must be at least 8 characters long")
], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() })
    }

    const email = req.body.email; // this pulls the email from the request body
    const password = req.body.password; // this pulls the password from the request body

    const hashedPassword = await bcrypt.hash(password, 10); // this hashes the password with a salt of 10

    db.query( //sql query to insert the new user into the database
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword], 
        (err, result) => {

            if(err) {
                console.log(err);
                return res.status(500).send();
            }

            res.status(201).json({
                message: "User Created!",
                userId: result.insertId
            })

        }
    );

});

usersRouter.post("/sign-in", async (req, res) => { // this is the route to sign in a user

    const email = req.body.email;
    const password = req.body.password; 

   
    db.query("SELECT * FROM users WHERE email=?", [email], async (err, result)=> { //sql query to select the user from the database

        if(err) { //if there is an error, return error message, if none, return the user data
            return res.status(401).json({ "message" : "Invalid Email or Password" })
        }

        const userData = result[0]; // this pulls the user data from the result

        const passwordMatch = await bcrypt.compare(password, userData.password); // this compares the password from the request body with the hashed password from the database

        if(!passwordMatch) { // if the password does not match, return error message 
            return res.status(401).json({"message" : "Invalid Email or Password"});
        }

        const token = jwt.sign( { // this creates a token with the user data
            // this is the payload that will be encoded in the token
            userId: userData.id, // id of the user
            email: userData.email // email of the user
        }, JWT_SECRET, { expiresIn: "4hr" }); // this sets the expiration time of the token to 4 hours

        res.json({ message: "Success!", jwt: token }); // this returns the token to the client
    })

})

module.exports = usersRouter;