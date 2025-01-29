const  weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "32dff282674296677b994ebbd85f7332";

weatherForm.addEventListener("submit",async event =>{

    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city!");
    }
});

async function getWeatherData(city) {
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch weather data 😥.");
    }
    return response.json();

}

function displayWeatherInfo(data){
    const {name: city, 
        main: {temp, humidity},
        wind:{speed}, 
        weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const gridContainer = document.createElement("div");
    const humidityContainer = document.createElement("div");
    const windContainer = document.createElement("div");
    const humidityDisplay = document.createElement("p");
    const windDisplay = document.createElement("p");
    

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed()}\u00B0C`;
    descDisplay.textContent = `${description}` +" " + getWeatherEmoji(id);
    windDisplay.textContent = `Wind 🌬️: ${speed}km/h`;
    humidityDisplay.textContent = `Humidity 💧: ${humidity}%`;

    tempDisplay.classList.add("tempDisplay");
    descDisplay.classList.add("descDisplay");
    gridContainer.classList.add("gridContainer");
    humidityContainer.classList.add("humidityContainer");
    windContainer.classList.add("windContainer");
    windDisplay.classList.add("windDisplay");
    humidityDisplay.classList.add("humidityDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(descDisplay);
    card.appendChild(gridContainer);
    gridContainer.appendChild(humidityContainer);
    gridContainer.appendChild(windContainer);
    windContainer.appendChild(windDisplay);
    humidityContainer.appendChild(humidityDisplay);

}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌩️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌦️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "💨";
        case (weatherId === 800 ):
            return "🌞";
        case (weatherId > 800 && weatherId < 810):
            return "🌥️";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex"
    card.appendChild(errorDisplay);

}