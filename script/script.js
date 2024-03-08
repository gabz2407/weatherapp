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

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(apiTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function apiTemperature(response) {
  let currentWeather = Math.round(response.data.temperature.current);
  let degrees = document.querySelector(".current-weather");
  degrees.innerHTML = currentWeather;

  let currentHumidity = response.data.temperature.humidity;
  let humidity = document.querySelector(".current-humidity");
  humidity.innerHTML = currentHumidity;

  let currentWindSpeed = response.data.wind.speed;
  let speed = document.querySelector(".current-wind-speed");
  speed.innerHTML = currentWindSpeed;

  let city = response.data.city;
  changeCity(city);
}

function changeCity(city) {
  let cityElement = document.querySelector("h1.city-result");
  cityElement.innerHTML = city;
}
