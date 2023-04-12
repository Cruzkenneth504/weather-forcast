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
//fetch lat and long to be able to retrieve information from selected city//
function getForcast(lat, lon, cityName){
  fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=f20f308b4dfef9c605356d708343cfae")
  .then(res => res.json())
  .then(data => {
    console.log(data)
    //retrive data to add content//
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
 //create a function with a forloop to display upcoming days weather//
function weekForcast (list) {
let dayCounter = 1;
for (let i = 7; i < list.length; i+=8) {

  const weekDay = list[i];
  //used dayjs to retrieve current date plus upcoming date//
  var date = dayjs(currentDay.dt_txt).format('MM/DD/YYYY');
  var temp = weekDay.main.temp;
  var wind = weekDay.wind.speed;
  var humidity = weekDay.main.humidity;
  
  
  document.getElementById(`day-${dayCounter}`).innerHTML = `
  <h4>${date}</h4> 
  <p>Temp: ${temp}℉</p>
  <p>Wind: ${wind}</p>
  <p>Humidity: ${humidity}%</p>
  `

  dayCounter++;
}


}
//stored cities inside localstorage//
function addCity (cityName) {
  var savedCities = JSON.parse(localStorage.getItem("cityWeather")) || []
  savedCities.push(cityName)
  localStorage.setItem("cityWeather", JSON.stringify(savedCities))
}

function getButtons() {
//retrieve city name from local storage//
var allCities = JSON.parse(localStorage.getItem("cityWeather"))

for (let i = 0; i < allCities.length; i++) {
  const currentCity = allCities[i];
  var button = document.createElement("button")
  button.textContent = currentCity
  button.addEventListener("click", function (e) {
  getWeather(currentCity)
  
})
  document.getElementById("city-buttons").append(button)
}

  
}
getButtons()


//added event listerner  to search button//
document.getElementById("search-btn").addEventListener('click', function (e) {
  e.preventDefault();
  var cityName = document.getElementById("cityName").value;

  getWeather(cityName);
  addCity(cityName)
})


