const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {

    // this pulls the token from the request header
    const authHeader = req.headers["authorization"];

    // this splits the header into two parts, the Bearer and the token
    const token = authHeader && authHeader.split(" ")[1];

    // this sends an error if the token is not present in the header
    if(!token) {
        return res.status(401).json({ message: "Access not granted" })
    }

    //this verifies the token and from the secret key, it decodes the token and returns the user data
    jwt.verify(token, JWT_SECRET, (err, userData) => {

        // sends an error if the token is invalid or expired
        if(err) {
            return res.status(403).json({ message: "Invalid or expired token" })
        }

        // if valid, sets the userData to the req object for use in other routes
        req.user = userData;
        next();

    })

}

module.exports = authenticateToken; //export 
