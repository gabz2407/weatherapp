let apiKey = "8bc029ce07bb99a925obf42d966t543f";

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

let weekDay = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let date = document.querySelector("span.date");
date.innerHTML = `${weekDay} ${hours}:${minutes}`;

//

function search(event) {
  event.preventDefault();

  let input = document.querySelector("#city-input");
  let city = input.value;

  requestAPI(city);
}

function requestAPI(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(apiTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function apiTemperature(response) {
  let weatherCondition = response.data.condition.description;
  let currentWindSpeed = response.data.wind.speed;
  let currentHumidity = response.data.temperature.humidity;
  let currentWeather = Math.round(response.data.temperature.current);
  let city = response.data.city;

  updateWeatherCondition(weatherCondition);
  updateWindSpeed(currentWindSpeed);
  updateHumidity(currentHumidity);
  updateDegrees(currentWeather);
  updateCity(city);
}

function updateWeatherCondition(weatherCondition) {
  let condition = document.querySelector(".weather-condition");
  condition.innerHTML = weatherCondition;
}

function updateWindSpeed(currentWindSpeed) {
  let speed = document.querySelector(".current-wind-speed");
  speed.innerHTML = currentWindSpeed;
}

function updateHumidity(currentHumidity) {
  let humidity = document.querySelector(".current-humidity");
  humidity.innerHTML = currentHumidity;
}

function updateDegrees(currentWeather) {
  let degrees = document.querySelector(".current-weather");
  degrees.innerHTML = currentWeather;
}

function updateCity(city) {
  let cityElement = document.querySelector("h1.city-result");
  cityElement.innerHTML = city;
}

requestAPI("London");
