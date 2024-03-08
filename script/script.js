let apiKey = "8bc029ce07bb99a925obf42d966t543f";

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

function apiTemperature(response) {
  let weather = {
    city: response.data.city,
    temperature: Math.round(response.data.temperature.current),
    condition: response.data.condition.description,
    humidity: response.data.temperature.humidity,
    windSpeed: response.data.wind.speed,
  };

  update(weather);
}

function getDate() {
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

  if (minutes < 10) {
    return `${weekDay} ${hours}:0${minutes}`;
  } else {
    return `${weekDay} ${hours}:${minutes}`;
  }
}

function update(weather) {
  updateHTMLElement("h1.city-result", weather.city);
  updateHTMLElement(".current-temperature", weather.temperature);
  updateHTMLElement(".weather-condition", weather.condition);
  updateHTMLElement(".current-humidity", weather.humidity);
  updateHTMLElement(".current-wind-speed", weather.windSpeed);

  updateHTMLElement("span.date", getDate());
}

function updateHTMLElement(className, value) {
  let element = document.querySelector(className);
  element.innerHTML = value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
requestApi("London");
