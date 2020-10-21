/* Global Variables */
//API KEY
var appid = 'c5a5c6d30f546edfa7e65dceaa49a6cf';
const appid2 = 'c5a5c6d30f546edfa7e65dceaa49a6cf&units=imperial';
const appid1 = 'c5a5c6d30f546edfa7e65dceaa49a6cf&units=metric';
//Local Server
const myserverurl = 'http://localhost:8000';
// api urlbase
const urlbase = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// get temp form api based on zipcode
const getWeatherAPI = async (url, zip, key) => {
	//compine baseurl with zipcode and apikey
	const fullUrl = url + zip + '&APPID=' + key;
	const response = await fetch(fullUrl);

	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};
// post (store) user data
const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		//bass the data as requset body
		body: JSON.stringify(data)
	});

	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};
// get data function that we use to return projectData
const GetData = async (url) => {
	// fetch response from /get route
	const response = await fetch(url);
	try {
		// convert the response
		const data = await response.json();
		//pass data object (projectData) to update ui function
		updateUI(data);
	} catch (error) {
		console.log('error', error);
	}
};
// update ui function put the values in their div as innerhtml for it
function updateUI(data) {
	document.getElementById('date').innerHTML = 'Date : ' + data['date'];
	document.getElementById('temp').innerHTML = 'Temprature : ' + data['temp'];
	document.getElementById('content').innerHTML = 'Feelings : ' + data['content'];
}

// get generate button object by its id
const generateButton = document.getElementById('generate');
//add click listener to it
generateButton.addEventListener('click', callBack);
// the callback function when click on it
function callBack(event) {
	// get the zip value
	const zipValue = document.getElementById('zip').value;
	// get the feeling value
	const feeling = document.getElementById('feelings').value;

	const tempType = document.getElementsByName('temp');
	var value;
	tempType.forEach((element) => {
		if (element.checked) {
			value = element.value;
			if (value == 'celsius') {
				console.log(value);
				appid = appid1;
			} else {
				console.log(value);
				appid = appid2;
			}
		}
	});

	//and call api function to get temp for that zip code
	getWeatherAPI(urlbase, zipValue, appid).then(function(response) {
		//when the response get the temp form it
		const temperature = response.main.temp;
		//and call postdata function to add these values to projectData object
		postData('/post', { date: newDate, temp: temperature, content: feeling }).then(function(response) {
			//then call getData to get projectData object and show it on most recent entry (update ui)
			GetData('/get');
		});
	});
}
