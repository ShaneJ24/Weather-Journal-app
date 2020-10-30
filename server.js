//express to run server and routes
const express = require('express');

//start up an instance app
const app = express();

//JS object
const appData = {}

//Dependencies
const bodyParser = require('body-parser');

//middle-ware
//configuring express to use bodyparser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors for cross orgin allowance
const cors = require('cors');
app.use(cors());

//intialize the main project folder
app.use(express.static('demo'));

const port = 8000

//spin up the server
const server = app.listen(port, listening);
//call back to debug
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: {$port}`);
}

//GET-Route
app.get('/all', function(req, res) {
    res.send(appData);
});

//post method route
const data = []

app.post('/', /*function name */ );

function /*function name*/ (req, res) {
    data.push(req.body);
    console.log(req.body);
};