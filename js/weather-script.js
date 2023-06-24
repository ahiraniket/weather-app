const weatherApiKey = "34562eec52811afa8ef0863a3fe654d3";
const weatherApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const unsplashAccessKey = "7PgTUzXeQc2Em_lVXd6LtmO09s_UoaNpNKkv-P_vqEA";


const loader = document.getElementById("loader");

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
    loader.style.opacity = "1";
  }, 500);
}
setTimeout(() => {
  hideLoader();
}, 1500);

async function fetchCityPhoto(city) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${city}-city&per_page=1&client_id=${unsplashAccessKey}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const photoUrl = data.results[0].urls.regular;
      return photoUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching city photo:", error);
    return null;
  }
}
async function checkWeather(city) {
  const response = await fetch(
    weatherApiUrl + city + "&appid=" + weatherApiKey
  );
  var data = await response.json();

  if (data.message == "city not found") {
    document.querySelector(".city").innerHTML = "City Name Incorrect";
    document.querySelector(".temp").innerHTML = "Invalid Input";
    document.querySelector(".details").style.display = "none";
    document.querySelector(".weather-type").style.display = "none";
    document.querySelector(".weather-icon").style.display = "none";
  } else {
    console.log(data);
    document.querySelector(".weather-type").innerHTML = data.weather[0].main;
    document.querySelector(".city").innerHTML =
      data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    }
    if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./images/clear.png";
    }
    if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/rain.png";
    }
    if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    }
    if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./images/mist.png";
    }
    if (data.weather[0].main == "Snow") {
      weatherIcon.src = "./images/snow.png";
    }
    if (data.weather[0].main == "Smoke") {
      weatherIcon.src = "./images/smoke.png";
    }
    if (data.weather[0].main == "Haze") {
      weatherIcon.src = "./images/haze.png";
    }
    const photoUrl = await fetchCityPhoto(city);
    if (photoUrl) {
      const bgImgElement = document.querySelector(".bg-img");
      bgImgElement.style.backgroundImage = `url(${photoUrl})`;
    }
    document.querySelector(".details").style.display = "flex";
    document.querySelector(".weather-type").style.display = "block";
    document.querySelector(".weather-icon").style.display = "block";
  }
  const cardElement = document.querySelector(".card");

  // Add the animate class to trigger the animation
  cardElement.classList.add("animate");

  // Wait for the animation to finish (0.5 seconds) before removing the animation class
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Remove the animate class to reset the animation
  cardElement.classList.remove("animate");
  document.querySelector(".weather-info").style.display = "block";
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
