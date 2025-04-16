// --- DOM Element References ---
const searchButton = document.querySelector(".search");
const cityInput = document.querySelector(".nav input");
const weatherIcon = document.querySelector(".weatherJpg img");
const tempElement = document.querySelector(".midText h1");
const cityElement = document.querySelector(".midText h2");
const feelsLikeElement = document.querySelector(".midText h3");
const humidityElement = document.querySelector(".humidity h2");
const windElement = document.querySelector(".wind h2");
const weatherDescElement = document.querySelector(".info h2");
const countryElement = document.querySelector(".info h3");
const errorMessageElement = document.querySelector(".error-message");

// --- API Configuration ---
// use .env for api keys
const apiKey = "f0063a39e8bf59a3c13c683ba4032bde";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// --- Functions ---

async function fetchAndUpdateWeather(city) {
  try {
    // Reset error state
    cityInput.classList.remove("error", "placeJs");
    cityInput.placeholder = "Enter city name";
    errorMessageElement.style.display = "none";

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      // Handle HTTP errors
      console.error("API Error:", response.status, response.statusText);
      displayError("City not found or API error.");
      return; // Stop execution if response is not OK
    }

    const data = await response.json();
    console.log(data);

    // Update UI elements
    tempElement.innerHTML = Math.round(data.main.temp) + "°C";
    cityElement.innerHTML = data.name;
    feelsLikeElement.innerHTML = "Feels like " + Math.round(data.main.feels_like) + "°C";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + " km/h"; // Corrected unit
    weatherDescElement.innerHTML = data.weather[0].main;
    countryElement.innerHTML = data.sys.country ? `in ${data.sys.country}` : ""; // Handle missing country

    // Update weather icon
    updateWeatherIcon(data.weather[0].main);
  } catch (error) {
    // Handle errors
    console.error("Fetch Error:", error);
    displayError("Failed to fetch weather data. Check connection or city name.");
  }
}

function updateWeatherIcon(weatherCondition) {
  let iconPath = "../images/";

  switch (weatherCondition) {
    case "Clear":
      iconPath += "clear.png";
      break;
    case "Snow":
      iconPath += "snow.png";
      break;
    case "Rain":
      iconPath += "rain.png";
      break;
    case "Drizzle":
      iconPath += "drizzle.png";
      break;
    case "Mist":
    case "Fog": // Added Fog
    case "Haze": // Added Haze
      iconPath += "mist.png";
      break;
    case "Clouds":
      iconPath += "clouds.png";
      break;
    default:
      iconPath += "clear.png"; // Default icon
      break;
  }
  weatherIcon.src = iconPath;
  weatherIcon.alt = `${weatherCondition} icon`; // Update alt text
}

function displayError(message) {
  errorMessageElement.textContent = message;
  errorMessageElement.style.display = "block";
  cityInput.classList.add("error", "placeJs"); // Add error classes for styling
  cityInput.placeholder = "Invalid city name"; // Change placeholder on error
}

// --- Event Listeners ---

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchAndUpdateWeather(city);
  } else {
    displayError("Please enter a city name.");
  }
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      fetchAndUpdateWeather(city);
    } else {
      displayError("Please enter a city name.");
    }
  }
});

// --- Initial Load ---
fetchAndUpdateWeather("Bhuj"); // Load default city weather on page load
