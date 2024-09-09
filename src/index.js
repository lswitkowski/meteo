

function refreshWeather(response) {
  console.log(response.data);
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
       timeElement.innerHTML = formatDate(date);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");