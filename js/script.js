const weatherInfo = document.getElementById('weather-info');
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');

// OpenWeatherMap API key
const apiKey = '95bddf7c0cccd1bbcc1880d1a16e6f11';

// Function to fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display weather data
function displayWeather(data) {
    if (data) {
        const weatherHtml = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Description: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        weatherInfo.innerHTML = weatherHtml;
    } else {
        weatherInfo.innerHTML = '<p>Failed to fetch weather data.</p>';
    }
}

// Event listener for form submission
cityForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (city) {
        const weatherData = await getWeather(city);
        displayWeather(weatherData);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a city.</p>';
    }
});
