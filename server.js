/* Empty JS object to act as endpoint for all routes */
projectData = {};

//express to run server and routes
const express = require('express');

//start up an instance app
const app = express();

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
app.use(express.static('website'));

const port = 8000

//spin up the server
const server = app.listen(port, listening);
//call back to debug
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

//post method route
const data = []

app.post('/addweather', storeWeatherData );

function storeWeatherData (req, res) {
    projectData.date= req.body.date;
    projectData.temp = req.body.temp;
    projectData.content=req.body.content;
    res.send(projectData);
};

//GET-Route
app.get('/all', sendData) 

function sendData(req, res) {
    res.send(projectData);
};
