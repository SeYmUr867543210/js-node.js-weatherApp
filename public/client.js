const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");

const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

let monthsArr = ["Январь", "Февраль", "Март", "Апрель", "Май", " Июнь", "Июль", "Август", "Сентябрь", "Октябрь", " Ноябрь", "Декабрь"];
dateElement.innerHTML = `${new Date().getDate()}, ${monthsArr[new Date().getMonth()].substring(0, 3)}`

weatherForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let fetchWeather = "/weather";//weatherRout

    locationElement.innerHTML = "Loading..."
    tempElement.innerHTML = "";
    weatherCondition.innerHTML = "";

    const locationApi = `${fetchWeather}?address=${search.value}`
    fetch(locationApi).then(function (response) {
        response.json().then(function (data) {

            if ( data.description == "light rain") {//cloudy fog rain sunny
                weatherIcon.className = "wi wi-day-rain"
            } else if (data.description == "overcast clouds" || data.description == "few clouds" || data.description == "broken clouds") {
                weatherIcon.className = "wi wi-day-cloudy";
            } else if (data.description == "clear sky") {
                weatherIcon.className = `wi wi-day-sunny`
            }else if(data.description == "fog" ){
                weatherIcon.className = `wi wi-day-${data.description}`;
            }

            locationElement.innerHTML = data.cityName;
            tempElement.innerHTML = `${(data.temperature - 273.5).toFixed(1)} ${String.fromCharCode(176)}`;// calvinTemP - 273.5 = celsius //vozvrashaet simvol iz koda simvolov
            weatherCondition.innerHTML = data.description.toUpperCase();
        })
    })
})