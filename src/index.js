let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayToday = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${dayToday} ${currentHour}:${currentMinutes}`;

function showTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempShown = document.querySelector("#current-temp");
  tempShown.innerHTML = `${currentTemp}°`;
  let currentHumidity = Math.round(response.data.main.humidity);
  let humiShown = document.querySelector("#humidity");
  humiShown.innerHTML = `Humidity : ${currentHumidity}%`;
  let currentWind = Math.round(response.data.wind.speed);
  let windShown = document.querySelector("#wind");
  windShown.innerHTML = `Wind : ${currentWind}km/h`;
  let cityShown = document.querySelector("#city-chosen");
  cityShown.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let typedCity = document.querySelector("#city-name");
  let apiKey = "dee9a420d2a7b5a314d3260f8ca83eea";
  let cityName = typedCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let city = document.querySelector("#city-form");
city.addEventListener("submit", searchCity);

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "dee9a420d2a7b5a314d3260f8ca83eea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let current = document.querySelector("#curButton");
current.addEventListener("click", showCurrent);
