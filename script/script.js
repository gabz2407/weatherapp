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

  requestApi(city);
}

function requestApi(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(apiTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function apiTemperature(response) {
  let weatherCondition = response.data.condition.description;
  let currentWindSpeed = response.data.wind.speed;
  let currentHumidity = response.data.temperature.humidity;
  let currentTemp = Math.round(response.data.temperature.current);
  let city = response.data.city;

  updateWeatherCondition(weatherCondition);
  updateWindSpeed(currentWindSpeed);
  updateHumidity(currentHumidity);
  updateDegrees(currentTemp);
  updateCity(city);
}

function updateWeatherCondition(weatherCondition) {
  updateHTMLElement(".weather-condition", weatherCondition);
}

function updateWindSpeed(currentWindSpeed) {
  updateHTMLElement(".current-wind-speed", currentWindSpeed);
}

function updateHumidity(currentHumidity) {
  updateHTMLElement(".current-humidity", currentHumidity);
}

function updateDegrees(currentTemp) {
  updateHTMLElement(".current-temperature", currentTemp);
}

function updateCity(city) {
  updateHTMLElement("h1.city-result", city);
}

function updateHTMLElement(className, value) {
  let element = document.querySelector(className);
  element.innerHTML = value;
}

requestApi("London");
