// Moment.js code that prints live time and date to the snow card.
var date = document.getElementById("day");

function DateTime() {
    var Day = moment().format("MMM DD, YYYY [at] hh:mm a");
    date.textContent = Day;
}
setInterval(DateTime, 1000);

// Variables to target fetch-btn and selected-city ids
var searchBtn = document.getElementById("fetch-btn");
var City = $("#selected-city");

// Openweathermap API Key
apiKey = "1fc359ee9b12b02ee9633470d8821b6b"

// Variables to target and print information to weather elements within card
var Local = document.getElementById("Location");
var dtDy = document.getElementById("date-time");
var wxIcon = document.getElementById("icon");
var temp = document.getElementById("Temp");
var wind = document.getElementById("Wind");
var condition = document.getElementById("Conditions")


// Function that handles weather information retrieval
function weatherCity() {
    // Variable that deals with user input for city
    var city_name = City.val();

    // Openweathermap API link to retrieve current weather information
    weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name+"&units=imperial&appid=" + apiKey;

    // Fetch function to retrieve data
    fetch(weatherApi)
        .then(function (weatherResponse) {
            // Monitors the response for the retrieval
            return weatherResponse.json();
        })
        .then(function (weatherData) {
            // Logs weather data into local storage
            console.log(weatherData);

            // Generates the weather icon based on the condition
            wxIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png");

            // Section that handles timezone conversions for accurate date and time in locations
            var Julian = weatherData.dt;
            var Calendar = weatherData.timezone / 60 / 60;
            dtDy.textContent = moment(moment.unix(Julian).utc().utcOffset(Calendar)).format("MMM DD, YYYY [at] hh:mm a");

            // Generates weather data into the card
            Local.textContent = weatherData.name;
            temp.textContent = "Temp: " + weatherData.main.temp + "F";
            wind.textContent = "Wind: " + weatherData.wind.speed + "mph";
            condition.textContent = "Condittions: " + weatherData.weather[0].description;
        })

}

// Event listener that generates weather information when the user hiting the search button
searchBtn.addEventListener('click', weatherCity);