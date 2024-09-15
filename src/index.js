

function refreshWeather(response) {
  getForecast(response.data.city);
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


function getForecast(city){
 let apiKey = "65ae2e8ao4f01409ca53644a9atfcbed";
 let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
 axios.get(apiUrl).then(displayForecast);
}


function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="future-forecast-day">

 <div class="future-forecast-date">${day}</div>
  <div class="future-forecast-icon">☀️ </div>
  <div class="future-forecast-temps">
    <div class="future-forecast-temp"><strong>5°</strong></div> 
    <div class="future-forecast-temp">9°</div>
  </div></div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
        displayForecast();

        let searchFormElement = document.querySelector("#search-form");
        searchFormElement.addEventListener("submit", handleSearchSubmit);

        searchCity("Lisbon");
        