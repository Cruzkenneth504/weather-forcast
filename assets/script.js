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
    document.getElementById("temp").textContent = temp
    
    var date = dayjs(data.list[0].dt_txt).format('MM/DD/YYYY');
    document.getElementById("city-name").textContent = cityName + " " + date
    
    var wind = data.list[0].wind.speed
    document.getElementById("wind").textContent = wind

    var humidity = data.list[0].main.humidity
    document.getElementById("humidity").textContent = humidity 
    
    weekForcast(data.list)
  
  })
}
 
function weekForcast (list) {
let dayCounter = 1;
for (let i = 7; i < list.length; i+=8) {
  const currentDay = list[i];
  var date = dayjs(currentDay.dt_txt).format('MM/DD/YYYY');
  var temp = currentDay.main.temp;

  document.getElementById(`day-${dayCounter}`).innerHTML = `
  <h4>${date}☀️</h4> 
  <p>Temp: ${temp}</p>
  <p>Wind:</p>
  <p>Humidity:</p>
  `

  dayCounter++;
}

}

document.getElementById("search-btn").addEventListener('click', function (e) {
  e.preventDefault();
  var cityName = document.getElementById("username").value;

  getWeather(cityName)
})