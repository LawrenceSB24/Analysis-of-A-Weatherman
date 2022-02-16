// Nothing too grand. Just a time function to add the date to the quote card.
var date = document.getElementById("day");

function DateTime() {
    var Day = moment().format("MMM DD, YYYY [at] hh:mm a");
    date.textContent = Day;
}
setInterval(DateTime, 1000);

var searchBtn = document.getElementById("fetch-btn");
var City = $("#selected-city");

apiKey = "1fc359ee9b12b02ee9633470d8821b6b"
var Local = document.getElementById("Location");
var dtDy = document.getElementById("date-time");
var wxIcon = document.getElementById("icon");
var temp = document.getElementById("Temp");
var wind = document.getElementById("Wind");
var condition = document.getElementById("Conditions")

function weatherCity() {
    var city_name = City.val();

    weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name+"&units=imperial&appid=" + apiKey;
    fetch(weatherApi)
        .then(function (weatherResponse) {
            return weatherResponse.json();
        })
        .then(function (weatherData) {
            console.log(weatherData);
            wxIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png");

            var Julian = weatherData.dt;
            var Calendar = weatherData.timezone / 60 / 60;
            dtDy.textContent = moment(moment.unix(Julian).utc().utcOffset(Calendar)).format("MMM DD, YYYY [at] hh:mm a");

            Local.textContent = weatherData.name;
            temp.textContent = "Temp: " + weatherData.main.temp + "F";
            wind.textContent = "Wind: " + weatherData.wind.speed + "mph";
            condition.textContent = "Condittions: " + weatherData.weather[0].description;
        })

}

searchBtn.addEventListener('click', weatherCity);