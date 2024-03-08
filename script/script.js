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
  changeCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function changeCity(city) {
  let cityElement = document.querySelector("h1.city-result");
  cityElement.innerHTML = city;
}
