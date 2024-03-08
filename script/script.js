//todays date
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
