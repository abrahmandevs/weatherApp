// Replace YOUR_API_KEY with your actual OpenWeatherMap API key
const apiKey = 'e9b077b031805ac45d65b2ba6d338aba';
const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationInput = document.getElementById('locationInput');
const displayWeather = document.getElementById('displayWeather');

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location === '') {
        alert('Please enter a location!');
        return;
    }

    fetchWeatherData(location);
});

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        //const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API_key}`);

        const data = await response.json();

        if (data.cod !== 200) {
            alert('Location not found! Please enter a valid city name.');
            return;
        }

        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherData(data) {
    const { name, main, weather, wind, sys, timezone, visibility, } = data;
    const weatherInfo = `${name}: ${weather[0].description}, Temperature: ${main.temp}°C, Humidity: ${main.humidity}% , ${wind.speed}`;


    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    displayWeather.innerHTML = `<div id="displayWeather"
    class="d-flex justify-content-between bg-primary py-2 px-3 rounded-1 text-white">
    <div class="flex-shrink-0">
        <h5 id="name" class="fw-bold">${name} ,${sys.country}</h5>
        <ul class="list-group list-group-flush small">
            <li class="list-group-item bg-transparent border-0 p-0 text-white">Temperature: ${main.temp}°C</li>
            <li class="list-group-item bg-transparent border-0 p-0 text-white">Wind: ${wind.speed} </li>
            <li class="list-group-item bg-transparent border-0 p-0 text-white">Humidity: ${main.humidity}%</li>
            <li class="list-group-item bg-transparent border-0 p-0 text-white">Sunrise: ${formatAMPM(new Date(sys.sunrise))}</li>
            <li class="list-group-item bg-transparent border-0 p-0 text-white">Sunset: ${formatAMPM(new Date(sys.sunset))}</li>
        </ul>
    </div>
    <div class="flex-grow-0 text-end">
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" class="img-fluid" alt="">
    </div>
</div>`;

    console.log(data)
}
