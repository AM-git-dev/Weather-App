function getWeather() {
    const apiKey = "8c9e050e12ab21f6b21716e30a45b3bb";
    const city = document.getElementById('searchbar').value;

    if (!city) {
        alert('No city indicated');
        return;
    }

    const actualWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(actualWeatherURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error during fetching weather data:', error);
            document.getElementById('infos').innerHTML = `<p>${error.message}</p>`;
        });

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayForecast(data.list))
        .catch(error => {
            console.error('Error during fetching forecast data:', error);
            document.getElementById('infos').innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const temperatureDiv = document.getElementById('temperature');
    const infosDiv = document.getElementById('infos');

    const cityName = data.name;
    const country = data.sys.country;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    const temperatureInHTML = `<h3>${temperature}°C</h3>
    <h3>${description}</h3>`;

    const infosInHTML = `
        <h3>${cityName}, ${country}</h3>
        
    `;
    infosDiv.innerHTML = infosInHTML;
    temperatureDiv.innerHTML = temperatureInHTML;
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = iconURL;
    weatherIcon.style.display = 'block';
}

function displayForecast(dailyData) {
    const forecastDiv = document.getElementById('daybyday');
    const forecastSection = document.getElementById('forecast5days');


    const dailyForecasts = dailyData.filter(entry => entry.dt_txt.includes("12:00:00"));


    const forecastTitle = `<h2>Prévisions sur 5 jours</h2>`;
    let forecastHTML = '';


    dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString("fr", { weekday: 'long', month: 'short', day: 'numeric' });
        const temperature = Math.round(day.main.temp);
        const description = day.weather[0].description;
        const icon = day.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        forecastHTML += `
            <div class="forecast-day">
                <p><strong>${date}</strong></p>
                <img src="${iconURL}" alt="${description}" />
                <p>${temperature}°C</p>
                <p>${description}</p>
            </div>
        `;
    });


    forecastSection.innerHTML = forecastTitle;
    forecastDiv.innerHTML = forecastHTML;
}


const apiKey = "8c9e050e12ab21f6b21716e30a45b3bb";
const searchBar = document.getElementById("searchbar");
const datalist = document.getElementById("citiesResults");

async function fetchCities(query) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
        return data;

    } catch (error) {
        console.error("Error fetching cities:", error);
        return [];
    }
}

function updateSuggestions(cities) {
    if (!datalist) {
        console.error("Datalist element is missing!");
        return;
    }
    datalist.innerHTML = "";
    cities.forEach(city => {
        const option = document.createElement("option");
        const state = city.state ? `, ${city.state}` : "";
        option.value = `${city.name}${state}, ${city.country}`;
        console.log(city)
        datalist.appendChild(option);
    });
}

searchBar.addEventListener("input", async (event) => {
    const query = event.target.value;

    if (!datalist) {
        console.error("Datalist element is missing!");
        return;
    }

    if (query.length >= 3) {
        const cities = await fetchCities(query);
        updateSuggestions(cities);
    } else {
        datalist.innerHTML = "";
    }
});
