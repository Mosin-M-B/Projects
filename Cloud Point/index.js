const key = "398682042e2e9da7161c8e26e8fb8966";
const url = " https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const wi = document.querySelector(".w-i");
async function fetchData(city) {
  const response = await fetch(url + city + `&appid=${key}`);
  if (response.status == 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  } else {
    var data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".hummidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      wi.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      wi.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      wi.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      wi.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      wi.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchbtn.addEventListener("click", () => {
  fetchData(searchBox.value);
});
