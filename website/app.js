/* Global Variables */
const url = "http://api.openweathermap.org/data/2.5/weather?zip="
const key = "&appid=64716188118a12cc44b50c1524afbe76"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeather = async (url, zip, key)=>{
  const res = await fetch(url + zip + key)
  try{
    const data = await res.json();
    return data;
  } catch(error) {
    console.log("error", error);
  }
}

const postWeather = async (data)=>{
  const res = await fetch('http://localhost:8000/postData', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
  } catch(error) {
    console.log("error", error);
  }
}

const updateUI = async ()=>{
  const request = await fetch('http://localhost:8000/getData');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temperature;
    document.getElementById('content').innerHTML = allData.user_response;
  }catch(error){
    console.log("error", error)
  }
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zip = document.getElementById('zip').value;
  getWeather(url, zip , key)
  .then(function(data){
    let temp = data.main['temp'];
    let user_response = document.getElementById('feelings').value;
    postWeather({
      temperature:temp, 
      date:newDate, 
      user_response:user_response
    }).then(function(){
      updateUI()
    })
  })
}