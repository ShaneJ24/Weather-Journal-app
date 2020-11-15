// Here is the URL and API key from openweathermap API
const Url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
const apiKey = '&appid=ea864c0a40dc1291a60388363360974d';

// Get the date
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//event listener that gets the form I created in the HTML. Then looks for when the form is submitted. Used lesson 4-6 "Adding fetch to your code" as a reference for the event listener and function.
document.getElementById('form').addEventListener('submit', performAction);

//function for event listener 
function performAction(e){
  //added preventDefault() after revewing https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault to ensure my event is handled properly. 
  e.preventDefault();
  const newZipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  
  //Api call
  // Used lesson 4-9 "Chaining Promises" as reference for properly using then .then().
  pullWeather(Url, newZipCode, apiKey)
    .then(function (userInfo) {
      console.log(userInfo);
    //add data to post request
    postData('/addweather', {date: newDate, temp: userInfo.main.temp, content: feelings})
    })
    //Updated the UI used lesson 4-10 "Updating UI elements" as reference.
    .then(
      updateUI()
    )
}

//GET web api data
const pullWeather = async (Url, newZipCode, apiKey)=>{
  const res = await fetch(Url + newZipCode + apiKey)
  try {
    const userInfo = await res.json();
    console.log(userInfo)
    return userInfo;
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
        const newInfo = await response.json();
        console.log(newInfo);
        return newInfo;
      }
      catch(error) {
      console.log("error", error);
      // appropriately handle the error
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
      // appropriately handle the error
  }
}
