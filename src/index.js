function refreshWeather(response) {
  let realTemp = document.querySelector(".current-temperature-value");
  let currentTemp = Math.round(response.data.temperature.current);
  realTemp.innerHTML = currentTemp;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#windspeed");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#current-time");
  console.log(timeElement);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "65ae2e8ao4f01409ca53644a9atfcbed";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "65ae2e8ao4f01409ca53644a9atfcbed";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastHtml = "";


  response.data.daily.forEach(function (day, index) {
  if (index < 5){  forecastHtml =
    forecastHtml +
    `<div class="future-forecast-day">

 <div class="future-forecast-date">${formatDay(day.time)}</div>
 <img src="${day.condition.icon_url}" class="future-forecast-icon" />
  <div class="future-forecast-temps">
    <div class="future-forecast-temp"><strong>${Math.round(day.temperature.maximum)}°</strong></div> 
    <div class="future-forecast-temp">${Math.round(day.temperature.minimum)}°</div>
  </div></div>`;
  }});

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");
