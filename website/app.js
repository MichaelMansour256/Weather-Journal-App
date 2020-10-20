/* Global Variables */
const appid = 'c5a5c6d30f546edfa7e65dceaa49a6cf';
const myserverurl = 'http://localhost:8000';
const urlbase = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
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
	//and call api function to get temp for that zip code
	getWeatherAPI(urlbase, zipValue, appid).then(function(response) {
		//when the response get the temp form it
		const temperature = response.main.temp;
		//and call postdata function to add these values to projectData object
		postData('/post', { date: newDate, temp: temperature, content: feeling });
		//then call getData to get projectData object and show it on most recent entry (update ui)
		GetData();
	});
}

const getWeatherAPI = async (url, zip, key) => {
	const fullUrl = url + zip + '&APPID=' + key;
	const response = await fetch(fullUrl);

	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};

const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};

const GetData = async () => {
	const r = await fetch('/get');
	try {
		const data = await r.json();
		document.getElementById('date').innerHTML = 'Date : ' + data['date'];
		document.getElementById('temp').innerHTML = 'Temprature : ' + data['temp'];
		document.getElementById('content').innerHTML = 'Feelings : ' + data['content'];
	} catch (error) {
		console.log('error', error);
	}
};
