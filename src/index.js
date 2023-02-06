// Display current date and time

let currentDateTime = new Date();
let currentDay = document.querySelector("#day");
let currentTime = document.querySelector("#time");
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

currentDay.innerHTML = `${weekDays[currentDateTime.getDay()]}`;
currentTime.innerHTML = `, ${String(currentDateTime.getHours()).padStart(
  2,
  "0"
)}:${String(currentDateTime.getMinutes()).padStart(2, "0")}`;

// Display city name

function formatCityName(cityName) {
  cityName = cityName.trim();
  let formattedCityName = "";
  let cityNameArr = cityName.split(" ");
  for (let i = 0; i < cityNameArr.length; ++i) {
    if (cityNameArr[i].length !== 0) {
      let cityString = cityNameArr[i];
      formattedCityName +=
        cityString[0].toUpperCase() + cityString.slice(1).toLowerCase();
      formattedCityName += " ";
    }
  }
  formattedCityName = formattedCityName.slice(0, -1);
  return formattedCityName;
}

// Display Current Temperature
function displayTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = `${currentTemperature}`;
}

function displayCityName(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city");
  cityName.value = formatCityName(cityName.value);
  if (cityName.value) {
    let displayCityName = document.querySelector("#city-name");
    displayCityName.innerHTML = cityName.value;

    // Display temperature by city name
    let apiKey = `b20ecfd3dab44a1228a1285e56521d52`;
    let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`; //q={city name}&appid={API key}`;
    let apiUrl = `${apiEndPoint}q=${cityName.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  } else {
    alert(`Please enter a city name`);
  }
}

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener("submit", displayCityName);

// Display temperature (C <-> F)

function displayCelcius() {
  let temperature = document.querySelector("#today-temperature");
  let celcius = document.querySelector("#degree-celcius");
  let fahrenheit = document.querySelector("#degree-fahrenheit");

  celcius.classList.add("focus");
  celcius.classList.remove("unfocus");
  fahrenheit.classList.add("unfocus");
  fahrenheit.classList.remove("focus");
  temperature.innerHTML = "17";
}

function displayFahrenheit() {
  let temperature = document.querySelector("#today-temperature");
  let celcius = document.querySelector("#degree-celcius");
  let fahrenheit = document.querySelector("#degree-fahrenheit");

  celcius.classList.add("unfocus");
  celcius.classList.remove("focus");
  fahrenheit.classList.add("focus");
  fahrenheit.classList.remove("unfocus");
  temperature.innerHTML = "63";
}
let celcius = document.querySelector("#degree-celcius");
let fahrenheit = document.querySelector("#degree-fahrenheit");

celcius.addEventListener("click", displayCelcius);
fahrenheit.addEventListener("click", displayFahrenheit);

//Current Location Weather Report

function displayCurrentLocation(response) {
  let city = response.data.name;
  let displayCityName = document.querySelector("#city-name");
  let cityName = document.querySelector("#search-city");

  displayCityName.innerHTML = city;
  cityName.value = city;

  displayTemperature(response);
}

function getCurrentLocationCoordinates(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = `b20ecfd3dab44a1228a1285e56521d52`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentLocation);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocationCoordinates);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", currentLocation);
