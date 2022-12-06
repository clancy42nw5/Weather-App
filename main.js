const locationName = document.getElementById('locationName');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const weatherType = document.getElementById('weatherType');
const description = document.getElementById('description');

const minTemp = document.getElementById('minTemp');
const tempNow = document.getElementById('tempNow');
const feelsLike = document.getElementById('feelsLike');
const maxTemp = document.getElementById('maxTemp');

const lessRain = document.getElementById('lessRain');
const moreRain = document.getElementById('moreRain');

const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const windDegree = document.getElementById('windDegree');
const windDirect = document.getElementById('windDirect');

const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

const searchForm = document.getElementById('searchForm');

//basic functions

function toCelsius(x) {
    return x - 273.15;
}

function toKmh(x) {
    return x*3.6;
}

function toWindDirection(x) {
    if ((x >= 335) || (x < 25)) {
        return "Northerly";
    } else if ((x >= 25) && (x < 65)) {
        return "Nor'easter";
    } else if ((x >= 65) && (x < 115)) {
        return "Easterly";
    } else if ((x >= 115) && (x < 165)) {
        return "Sou'easter";
    } else if ((x >= 165) && (x < 205)) {
        return "Southerly";
    } else if ((x >= 205) && (x < 245)) {
        return "Sou'wester";
    } else if ((x >= 245) && (x < 295)) {
        return "Westerly";
    } else if ((x >= 295) && (x < 335)) {
        return "Nor'wester";
    };
};

function fromEpoch(x) {
    y = new Date(x*1000);
    //console.log(y);
    return y;
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    a = searchForm.elements['searchForm'];
    searchPlace = a.value;
    getWeather();
})

//main functions

async function getWeather() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+(searchPlace)+'&APPID=9cda9af487378577f155e716b4d705c7', {mode: "cors"});
    const weatherData = await response.json();

    console.log(weatherData);

    locationName.textContent = (weatherData.name);

    latitude.textContent = "Lat: " + (weatherData.coord.lat);
    longitude.textContent = "Lon: " + (weatherData.coord.lon);

    weatherType.textContent = weatherData.weather[0].main;
    description.textContent = "Specifically, "+weatherData.weather[0].description;
    
    minTemp.textContent = parseInt(toCelsius(weatherData.main.temp_min)) + "°c";
    tempNow.textContent = parseInt(toCelsius(weatherData.main.temp)) + "°c";
    feelsLike.textContent = parseInt(toCelsius(weatherData.main.feels_like)) + "°c";
    maxTemp.textContent = parseInt(toCelsius(weatherData.main.temp_max)) + "°c";

    //rain code v

    lessRain.textContent = weatherData.rain;
    moreRain.textContent = weatherData.rain;

    console.log(weatherData.rain);
    console.log(weatherData.rain);

    //rain code ^

    humidity.textContent = weatherData.main.humidity + "%";
    windSpeed.textContent = parseInt(toKmh(weatherData.wind.speed)) + " km/h";
    windDegree.textContent = weatherData.wind.deg;
    windDirect.textContent = toWindDirection(weatherData.wind.deg);
    
    sunrise.textContent = fromEpoch(weatherData.sys.sunrise).getHours()+":"+fromEpoch(weatherData.sys.sunrise).getMinutes();
    sunset.textContent = fromEpoch(weatherData.sys.sunset).getHours()+":"+fromEpoch(weatherData.sys.sunset).getMinutes();
};

//global code

let searchPlace = "port blair"

getWeather();