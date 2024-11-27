function getWeather(container) {
    if (!container) {
        container = document.querySelector('.weatherAppContainer');
    }

    const apiKey = "8c9e050e12ab21f6b21716e30a45b3bb";
    const cityInput = container.querySelector('.searchbar');
    const city = cityInput.value;

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
        .then(data => displayWeather(data, container))
        .catch(error => {
            console.error('Error during fetching weather data:', error);
            container.querySelector('.infos').innerHTML = `<p>${error.message}</p>`;
        });


    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayForecast(data.list, container))
        .catch(error => {
            console.error('Error during fetching forecast data:', error);
            container.querySelector('.infos').innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data, container) {
    const temperatureDiv = container.querySelector('.temperature');
    const infosDiv = container.querySelector('.infos');

    const cityName = data.name;
    const country = data.sys.country;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    const temperatureInHTML = `<h3>${temperature}°C</h3><h3>${description}</h3>`;
    const infosInHTML = `<h3>${cityName}, ${country}</h3>`;

    infosDiv.innerHTML = infosInHTML;
    temperatureDiv.innerHTML = temperatureInHTML;

    const weatherIcon = container.querySelector('.weather-icon');
    weatherIcon.src = iconURL;
    weatherIcon.style.display = 'block';
}

function displayForecast(dailyData, container) {
    const forecastDiv = container.querySelector('.daybyday');
    const forecastSection = container.querySelector('.forecast5days');

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

function updateSuggestions(cities, datalist) {
    datalist.innerHTML = "";
    cities.forEach(city => {
        const option = document.createElement("option");
        const state = city.state ? `, ${city.state}` : "";
        option.value = `${city.name}${state}, ${city.country}`;
        datalist.appendChild(option);
    });
}

const searchBars = document.querySelectorAll(".searchbar");

searchBars.forEach(searchBar => {
    searchBar.addEventListener("input", async (event) => {
        const query = event.target.value;
        const datalist = searchBar.closest('.weatherAppContainer').querySelector("#citiesResults");

        if (!datalist) {
            console.error("Datalist element is missing!");
            return;
        }

        if (query.length >= 3) {
            const cities = await fetchCities(query);
            updateSuggestions(cities, datalist);
        } else {
            datalist.innerHTML = "";
        }
    });
});


function createNewWeatherContainer() {
    const container = document.createElement('div');
    container.classList.add('weatherAppContainer');


    const uniqueId = `citiesResults-${Date.now()}`;

    container.innerHTML = `
        <label>
            <input type="text" class="searchbar" list="${uniqueId}" placeholder="Recherche une ville">
            <button onclick="getWeather(this.parentNode.parentNode)" class="searchbtn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </label>
        <section class="infoscontainer">
            <img src="" class="weather-icon" alt="Weather Icon">
            <section class="cityandmeteo">
                <div class="infos"></div>
                <div class="temperature"></div>
            </section>
        </section>
        <section class="forecast5days"></section>
        <div class="daybyday"></div>
        <datalist id="${uniqueId}"></datalist>
    `;

    document.body.appendChild(container);

    const newSearchBar = container.querySelector('.searchbar');
    const newDatalist = container.querySelector(`#${uniqueId}`);

    if (newSearchBar && newDatalist) {
        newSearchBar.addEventListener("input", async (event) => {
            const query = event.target.value;

            if (query.length >= 3) {
                const cities = await fetchCities(query);
                updateSuggestions(cities, newDatalist);
            } else {
                newDatalist.innerHTML = "";
            }
        });
    }

    const addCityButton = document.createElement('button');
    addCityButton.textContent = 'Ajouter une ville à comparer';
    addCityButton.classList.add('add-city-button');
    addCityButton.onclick = createNewWeatherContainer;
    document.body.appendChild(addCityButton);
}


