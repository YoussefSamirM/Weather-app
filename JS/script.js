let container = document.querySelector(".container");
let search = document.querySelector(".search button");
let weather = document.querySelector(".weather");
let moreInfo = document.querySelector(".more-info");
let error = document.querySelector(".error");

search.addEventListener("click", () => {
  let myAPIKey = "d39cfb5968d6dc9ad30d73a587f36146";
  let city = document.querySelector(".search input").value;

  if (city == "") {
    return "";
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myAPIKey}`
  )
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      if (data.cod == "404") {
        container.style.height = "400px";
        error.classList.add("active");
        weather.classList.remove("active");
        moreInfo.classList.remove("active");
      } else {
        container.style.height = "600px ";
        error.classList.remove("active");
        weather.classList.add("active");
        moreInfo.classList.add("active");
      }
      console.log(data);
      let img = document.querySelector(".weather img");
      let temperature = document.querySelector(".temperature");
      let description = document.querySelector(".description");
      let humidity = document.querySelector(".humidity span");
      let wind = document.querySelector(".wind span");
      switch (data.weather[0].main) {
        case "Clear":
          img.src = "images/clear.png";
          break;

        case "Clouds":
          img.src = "images/cloud.png";
          break;

        case "Snow":
          img.src = "images/snow.png";
          break;

        case "Rain":
          img.src = "images/rain.png";
          break;

        case "Mist":
          img.src = "images/mist.png";
          break;
      }
      temperature.innerHTML = `${data.main.temp.toFixed()}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].main}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed}Km/h`;
    });
});
