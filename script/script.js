let apiKey = "8bc029ce07bb99a925obf42d966t543f";

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
  if (response.data.message) {
    updateHtmlElement(
      ".error-container",
      `<p class="error">${response.data.message}</p>`
    );
  } else {
    let weather = {
      city: response.data.city,
      temperature: Math.round(response.data.temperature.current),
      condition: response.data.condition.description,
      humidity: `${response.data.temperature.humidity}%`,
      windSpeed: `${response.data.wind.speed}km/h`,
      emoji: `<img src="${response.data.condition.icon_url}" class="emoji">`,
    };

    update(weather);
  }
}

function update(weather) {
  updateHtmlElement("h1.city-result", weather.city);
  updateHtmlElement(".current-temperature", weather.temperature);
  updateHtmlElement(".weather-condition", weather.condition);
  updateHtmlElement(".current-humidity", weather.humidity);
  updateHtmlElement(".current-wind-speed", weather.windSpeed);
  updateHtmlElement(".emoji", weather.emoji);

  updateHtmlElement("span.date", getDate());

  updateHtmlElement(".error-container", "");

  getForecastApi(weather.city);
}

function updateHtmlElement(elementSelector, value) {
  let element = document.querySelector(elementSelector);
  element.innerHTML = value;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecastApi(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<ul class="daily-weather">
          <li>
            <div class="weather-forecast-week-day">${formatDate(day.time)}</div>
            <div><img src="${day.condition.icon_url}" 
              class="weather-forecast-emoji"</div>
            <div>
              <span class="weather-forecast-min">
              ${Math.round(day.temperature.minimum)}˚</span>
              <span class="weather-forecast-max">
              ${Math.round(day.temperature.maximum)}˚</span> 
            </div>
          </li>
        </ul>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

requestApi("London");
