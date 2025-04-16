const express = require('express');
const cors = require('cors'); 
const app = express();
const bodyParser = require('body-parser');
const brandRouter = require('./routers/brands');
const guitarsRouter = require('./routers/guitars');
const usersRouter = require('./routers/users');
const port = 3000;
 
app.use(cors()); // enable CORS for all routes

app.use(bodyParser.json()); // parse JSON request bodies

app.use(express.static('public')); // serve static files from the 'public' directory

app.use('/guitars', guitarsRouter); // router for handling routes related to guitars
app.use('/brands', brandRouter); // router for handling routes related to brands
app.use('/users', usersRouter); // router for handling routes related to users


app.listen(port, () => { // starts the server
  console.log(`Example app listening on port ${port}`)
});