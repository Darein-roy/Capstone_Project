document.addEventListener("DOMContentLoaded" , () => {
    const apiKey = "e4731f172418ed13a2dc73af47f8d4f0";
    const weatherDisplay = document.getElementById('weather-display');

    document.getElementById('searchBtn').addEventListener('click', (event) => {
        event.preventDefault();
    
        const city = document.getElementById('city').value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            displayError('Enter a city name');
        }
    });

    const getWeatherData = async (city) => {
        weatherDisplay.innerHTML = '<p>Loading...</p>'; 
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`)

            if (!response.ok) {
                throw new Error('City not found. Check the city name and try again.');
            } else {
                const data = await response.json();
                displayWeather(data);
                document.getElementById('city').value = ''; 
            }
        
        } catch (error) {
            displayError(error.message);
        }
    };

    const displayWeather = (data) => {
    const tempCelsius = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeedKmh = (data.wind.speed * 3.6).toFixed(2);
    const weatherIcon = data.weather[0].icon;
    const weatherDescription = data.weather[0].description;

    weatherDisplay.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${tempCelsius} °C</p>
        <p>Humidity: ${humidity} %</p>
        <p>Wind Speed: ${windSpeedKmh} km/h</p>
        <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}" />
        <p>${weatherDescription}</p>
    `;

    // update weather data every 10 minutes
    setTimeout(() => {
        getWeatherData(data.name);
    }, 600000); 
    };

    const displayError = (message) => {
        weatherDisplay.innerHTML = `<p style="color: red;">${message}</p>`;
    };

});
