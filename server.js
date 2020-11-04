// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

// Initialize the main project folder
app.use(express.static('website'));
app.use(cors());

// Setup Server
const port = 8000;

const server = app.listen(port, ()=>{
  console.log(`running on localhost: ${port}`);
});

app.get('/getData', function(req, res) {
  res.send(projectData);
});

app.post('/postData', function(req, res) {
  let data = req.body;
  console.log(data);
  let newEntry = { 
    temperature: data.temperature,
    date: data.date,
    user_response: data.user_response
  }
  projectData.push(newEntry);
  res.send(projectData);
});