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
    humidity: `${response.data.temperature.humidity}%`,
    windSpeed: `${response.data.wind.speed}km/h`,
    emoji: `<img src="${response.data.condition.icon_url}" class="emoji">`,
  };
  console.log(response);
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
  updateHtmlElement("h1.city-result", weather.city);
  updateHtmlElement(".current-temperature", weather.temperature);
  updateHtmlElement(".weather-condition", weather.condition);
  updateHtmlElement(".current-humidity", weather.humidity);
  updateHtmlElement(".current-wind-speed", weather.windSpeed);

  updateHtmlElement("span.date", getDate());

  updateHtmlElement(".emoji", weather.emoji);
}

function updateHtmlElement(className, value) {
  let element = document.querySelector(className);
  element.innerHTML = value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
requestApi("London");
