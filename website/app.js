/* Global Variables */
const form = document.querySelector('.app__form');
const icons = document.querySelectorAll('.entry__icon');

// Base URL and API key for openweathermap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
const apiKey = '&appid=ea864c0a40dc1291a60388363360974d';

// Get the date
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//event listener to add function
document.getElementById('form').addEventListener('submit', performAction);

//function for event listener 
function performAction(e){
  e.preventDefault();
  const newZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  
  getWeather(baseUrl, newZip, apiKey)
    .then(function (userData) {
      console.log(userData);
      return postData('/addweather', {date: newDate, temp: userData.main.temp, content: feelings})
    })
    .then(function (newData) {
    // call updateUI to update browser content
      updateUI()
    })
}

//GET web api data
const getWeather = async (baseUrl, newZip, apiKey)=>{
  const res = await fetch(baseUrl + newZip + apiKey)
  try {
    const userData = await res.json();
    console.log(userData)
    return userData;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

//POST data
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },       
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }
      catch(error) {
      console.log("error", error);
      }
  }

const updateUI = async () => {
  const response = await fetch('/all');
  try {
      const allData = await response.json();
      document.getElementById('temp').innerHTML = 'Temperature: '+ allData.temp.toFixed()+'F';
      document.getElementById('date').innerHTML = 'Date: '+allData.date;
      document.getElementById('content').innerHTML = 'User Response: '+allData.content;
  } catch (error) {
      console.log("error", error);
  }
}
