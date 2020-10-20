// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
//import express from 'express';
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
//port intialization
const port = 8000;
const server = app.listen(port, listening);
function listening() {
	console.log('server running');
	console.log(`running on localhost: ${port}`);
}
//get route 
app.get('/get', getData);
//post route
app.post('/post', PostData);

//get data callback
function getData(request, response) {
	response.send(projectData);
}

//post callback
function PostData(request, response) {
  //get request body
  const data = request.body;
  //put every value for its key in projectData objects
	projectData['date'] = data.date;
	projectData['temp'] = data.temp;
  projectData['content'] = data.content;
  //and return projectData object as response 
	response.send(projectData);
	
}
