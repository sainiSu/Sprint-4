/*****WEATHER FORECAST*/ 
  
const displayWeather = async (): Promise<void> => {
  const apiKey = "YOUR API KEY";
  const city: HTMLElement | null = document.getElementById("city")


  if (!city) {
    alert("City is not found!");
    return;
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather", error);
    });
};
const getWeather = (data: any) => {
  const weatherIcon = document.getElementById("weather-icon") as HTMLImageElement;
  const temperatureDiv = document.getElementById("temp");
  const infoDiv = document.getElementById("info");

  if (weatherIcon && temperatureDiv && infoDiv) {
    // Set weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.src = iconUrl;

    // Set temperature
    const temperature = data.main.temp;
    temperatureDiv.innerText = `Temperature: ${temperature}°C`;

    // Set weather description
    const description = data.weather[0].description;
    infoDiv.innerText = `Weather: ${description}`;
  }
};

/* jokes */

//joke will appear on screen when reload the page
window.onload = function () {
  getJokes();
};

const getJokes = async (): Promise<void> => {

  let jokeElement: HTMLElement | null = document.getElementById("joke");

  fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: { Accept: "application/json", }
  })

    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.joke);
      // If jokeElement exists, add a joke
      if (jokeElement) {
        jokeElement.innerHTML = data.joke;
      }
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
      if (jokeElement) {
        jokeElement.innerHTML = "No jokes available";
      }
    });
};
