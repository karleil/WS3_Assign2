
const express = require('express');
const cors = require('cors'); 
const app = express();
const bodyParser = require('body-parser');
const brandRouter = require('./routers/brands');
const guitarsRouter = require('./routers/guitars');
const port = 3000;
 
// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(bodyParser.json());

// Serve the 'public' folder as a static folder
app.use(express.static('public'));

// Use the routers 
app.use('/guitars', guitarsRouter);
app.use('/brands', brandRouter);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});