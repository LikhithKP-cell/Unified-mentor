const apiKey = "e84a6671210dd567717848f3be8fe66a"; 
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

document.getElementById("get-weather").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value.trim();
  const errorMessage = document.getElementById("error-message");
  const weatherResult = document.querySelector(".weather-result");

  errorMessage.textContent = "";
  weatherResult.style.display = "none";

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(`${weatherUrl}?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error("City not found.");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});

function displayWeather(data) {
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const weatherIcon = document.getElementById("weather-icon");
  const weatherResult = document.querySelector(".weather-result");

  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  description.textContent = `Condition: ${data.weather[0].description}`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherResult.style.display = "block";
}
