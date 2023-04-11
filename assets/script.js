function getWeather(cityName) {
  // make api call to get lat and long//
  fetch("http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid=f20f308b4dfef9c605356d708343cfae")
  .then(res => res.json())
  .then(data => {
    // extract lat and lon from data//
    console.log(data)
    var lat = data[0].lat;
    var lon = data[0].lon;
    getForcast(lat, lon, data[0].name)
  })
}

function getForcast(lat, lon, cityName){
  fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=f20f308b4dfef9c605356d708343cfae")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    
    var temp = data.list[0].main.temp
    document.getElementById("temp").textContent = temp + " ℉" 
    
    var date = dayjs(data.list[0].dt_txt).format('MM/DD/YYYY');
    document.getElementById("city-name").textContent = cityName + " " + date
    
    var wind = data.list[0].wind.speed
    document.getElementById("wind").textContent = wind 

    var humidity = data.list[0].main.humidity
    document.getElementById("humidity").textContent = humidity + " %"

    var icon = data.list[0].weather[0].icon
    document.getElementById("icon").setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);


    weekForcast(data.list)

  
  })
}
 
function weekForcast (list) {
let dayCounter = 1;
for (let i = 7; i < list.length; i+=8) {

  const currentDay = list[i];
  var date = dayjs(currentDay.dt_txt).format('MM/DD/YYYY');
  var temp = currentDay.main.temp;
  var wind = currentDay.wind.speed;
  var humidity = currentDay.main.humidity;
  var icon = currentDay.weather.icon;

  document.getElementById(`day-${dayCounter}`).innerHTML = `
  <h4>${date}<span><img src ="https://openweathermap.org/img/wn/${icon}@2x.png"></span></h4> 
  <p>Temp: ${temp}℉</p>
  <p>Wind: ${wind}</p>
  <p>Humidity: ${humidity}%</p>
  `

  dayCounter++;
}





}

function addCity (cityName) {
  var savedCities = JSON.parse(localStorage.getItem("cityWeather")) || []
  savedCities.push(cityName)
  localStorage.setItem("cityWeather", JSON.stringify(savedCities))
}

function showSavedCities() {
  savedCites = JSON.parse(localStorage.getItem("cityWeather"))
  buttonHTML = ``
  for(var i =0; i< savedCites.length;i++){
    currentCity =  savedCites[i]
    buttonHTML += `<button class=btn onclick=getWeather('${currentCity}')>${currentCity}</button>`
}
  //get cities from local storage
  //create buttonHTML variable
  //loop through saved cites and add button to html
  //update innerhtml of city-buttons



}

document.getElementById("search-btn").addEventListener('click', function (e) {
  e.preventDefault();
  var cityName = document.getElementById("cityName").value;

  getWeather(cityName);
  addCity(cityName)
})


