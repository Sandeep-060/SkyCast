# SkyScope - Weather App

SkyScope is a weather application that provides real-time weather information, forecasts, and location-based weather updates. Users can check the weather by entering a city name or by allowing access to their current location. It also supports dark mode for better user experience .

## Features

- **Search by City**: Users can search for the weather of any city by typing the city name.
- **Current Location Weather**: Allows users to get the weather of their current location with a click of a button.
- **Weather Details**: Displays current temperature, weather description, humidity, and wind speed for the searched city.
- **5-Day Weather Forecast**: Provides a 5-day weather forecast at noon (12:00 PM) with daily temperature and weather conditions.
- **Dark Mode**: Toggle between light and dark themes for a better viewing experience in different environments.
- **Responsive Layout**: Works seamlessly across different devices, ensuring a great user experience on mobile, tablet, and desktop.
- **Time Zone Adjustments**: Shows the local time of the searched city based on its time zone.

## Technologies Used

- **HTML**: Structure and layout of the weather app.
- **CSS**: Styling the weather app with a responsive and clean design.
- **JavaScript**: Handles dynamic content like weather fetching, dark mode toggle, and geolocation functionality.
- **OpenWeather API**: Fetches real-time weather data and forecasts.

## How It Works

1. **City Search**: When a user enters a city name and presses enter or clicks the search button, the app fetches the current weather and the 5-day forecast (with daily data available at 12:00 PM) using the OpenWeather API.
2. **Current Location**: When the user clicks on the "Current Location" button, the app uses the browser's geolocation to get the weather of the user's current location.
3. **Weather Data**: The app displays the city name, country, current weather, temperature, humidity, and wind speed.
4. **5-Day Weather Forecast**: Shows the 5-day forecast with daily temperature and weather conditions (e.g., rain, clear skies, clouds). The data is shown at noon (12:00 PM) for each of the next 5 days.
5. **Dark Mode**: The user can toggle between dark mode and light mode. The theme is saved in the browser's local storage for persistence across sessions.


## Live Demo

You can view the live demo of the SkyScope Weather App here:  
[SkyScope Weather App](https://sky-cast-jet.vercel.app/)