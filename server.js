// Setup empty JS object to act as endpoint for all routes.
let appData = {};

// Require Express to run server and routes.
const express = require('express');

// Start up an instance of app
const app = express();

//configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json.
app.use(bodyParser.json());

// Cors for cross origin allowance.
const cors = require('cors');
app.use(cors());

// Initialize the main project folder.
app.use(express.static('website'));

//GET Route.
app.get('/all', (req, res) => {
    res.send(appData)
    console.log('Data sent successfully.')
});

//POST Route.
app.post('/add', (req, res) => {
    appData = req.body;
    console.log(req.body);
    res.send(appData)
});

const port = 3000;

//function to test the server.
function listening() {
    console.log(`server is running on port:${port}`);
};
// Setup Server.
app.listen(port, listening);