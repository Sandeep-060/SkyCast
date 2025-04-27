const searchBtn = document.querySelector(".searchbtn");
const city = document.querySelector(".city-input");
const container = document.querySelector(".container");
const currentlocation = document.querySelector(".current-location-btn");
const darkModeButton = document.querySelector(".darkmode")

const apikey = 'a28e0099dfacbfc3659147c26775c76d';
const weatherIconMap = {
  Clear: "clear",
  Clouds: "clouds",
  Rain: "rain",
  Thunderstorm: "thunderstorm",
  Snow: "snow",
  Mist: "fog",
  Fog: "fog",
  Haze: "fog",
  Drizzle: "rain",
};

function getCityLocalTime(timezoneOffsetInSeconds) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const cityTime = new Date(utc + timezoneOffsetInSeconds * 1000);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return cityTime.toLocaleString('en-GB', options);
}

function createWeatherDetails(data) {
  const localTime = getCityLocalTime(data.timezone);
  const weatherMain = data.weather[0].main;
  const iconName = weatherIconMap[weatherMain] || "clear";
  const imgSrc = `assets/${iconName}.png`;

  const details = document.createElement("div");
  details.classList.add("details");
  details.innerHTML = `
    <div class="city-d">
      <h3><i class="fa-solid fa-location-dot"></i> ${data.name} <span id="country">${data.sys.country}</span></h3>
      <p>${localTime}</p>
    </div>
    <div class="tem">
      <img src="${imgSrc}" alt="">
      <h1>${data.main.temp}<sup>o</sup></h1>
      <p>${data.weather[0].description}</p>
    </div>
    <div class="other-d">
      <div class="humidty">
        <div class="pic"><i class="fa-solid fa-droplet"></i></div>
        <div class="info">
          <p>Humidity</p>
          <p>${data.main.humidity}%</p>
        </div>
      </div>
      <div class="wind">
        <div class="pic"><i class="fa-solid fa-wind"></i></div>
        <div class="info">
          <p>Wind Speed</p>
          <p>${data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  `;
  return details;
}

function createForecast(forecastData) {
  const totalForecast = document.createElement("div");
  totalForecast.classList.add("total-forecast");

  const heading = document.createElement("h3");
  heading.classList.add("fore");
  heading.textContent = "Forecast";

  const forecast = document.createElement("div");
  forecast.classList.add("forecast");

  const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyForecasts.forEach(element => {
    const date = new Date(element.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const weatherMainForecast = element.weather[0].main;
    const iconNameForecast = weatherIconMap[weatherMainForecast] || "clear";
    const imgSrcForecast = `assets/${iconNameForecast}.png`;

    forecast.innerHTML += `
      <div class="day">
        <p>${dayName}</p>
        <img src="${imgSrcForecast}" alt="">
        <p>${element.weather[0].main}</p>
        <p>${element.main.temp}<sup>o</sup></p>
      </div>
    `;
  });

  totalForecast.append(heading, forecast);
  return totalForecast;
}

function clearOldData() {
  const oldDetails = document.querySelector(".details");
  if (oldDetails){
    oldDetails.remove();
  } 
  const oldForecast = document.querySelector(".total-forecast");
  if (oldForecast){
    oldForecast.remove();
  } 
}

async function fetchWeatherAndForecast(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert("City not found");
      throw new Error("City not found");
    }

    const data = await response.json();
    clearOldData();
    container.append(createWeatherDetails(data));

    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apikey}&units=metric`;
    
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    container.append(createForecast(forecastData));

  } catch (error) {
    console.error("Error:", error.message);
  }
  finally {
    const searchSection = document.querySelector('.search-section');
    const offset = -350; 
    window.scrollTo({
      top: searchSection.offsetTop - offset,
      behavior: 'smooth'
    });
  }
  
}

async function getData() {
  const cityValue = city.value.trim();
  if (cityValue === "") {
    alert("Please enter city");
    city.focus();
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`;
  await fetchWeatherAndForecast(url);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
      fetchWeatherAndForecast(url);
    }, error => {
      alert("Grant permission to enable location");
      console.error("Geolocation Error:", error.message);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function getdark(){
  const body=document.body
  body.classList.toggle("dark-mode")

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
 
}

function savedtheme(){
  if (localStorage.getItem("theme") === "dark") {
   document.body.classList.add("dark-mode");
  }
}

searchBtn.addEventListener("click", getData);
city.addEventListener("keypress", event => {
  if (event.key === "Enter"){
    getData();
  } 
});
currentlocation.addEventListener("click", getLocation);

darkModeButton.addEventListener("click",getdark)

window.addEventListener("load",savedtheme)
