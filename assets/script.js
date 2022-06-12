var apiKey = "16c08d72512cd292161652f7d9f82632";



var currentWeatherSection = function(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}")
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}")
        .then(function(response) {
            return response.json();
        })
        .then(function(response){
            searchHistoryList(cityName);

        var currentWeatherContainer = $("#current-weather-container");
        currentWeatherContainer.addClass("current-weather-container");


        var currentTitle = $("#current-title");
        var currentDay = moment().format("M/D/YYYY");
        currentTitle.text("${cityName} (${currentDay})");
        var currentIcon = $("#current-weather-icon");
        currentIcon.addClass("current-weather-icon");
        var currentIconCode = response.current.weather[0].icon;
        currentIcon.attr("src", "https://openweathermap.org/img/wn/${currentIconCode}@2x.png");

        // add current temperature to page
        var currentTemperature = $("#current-temperature");
        currentTemperature.text("Temperature: " + response.current.temp + " \u00B0F");

        // add current humidity to page
        var currentHumidity = $("#current-humidity");
        currentHumidity.text("Humidity: " + response.current.humidity + "%");

        // add current wind speed to page
        var currentWindSpeed = $("#current-wind-speed");
        currentWindSpeed.text("Wind Speed: " + response.current.wind_speed + " MPH");

        // add uv index to page
        var currentUvIndex = $("#current-uv-index");
        currentUvIndex.text("UV Index: ");
        var currentNumber = $("#current-number");
        currentNumber.text(response.current.uvi);

        // add appropriate background color to current uv index number
        if (response.current.uvi <= 2) {
            currentNumber.addClass("favorable");
        } else if (response.current.uvi >= 3 && response.current.uvi <= 7) {
            currentNumber.addClass("moderate");
        } else {
            currentNumber.addClass("severe");
        }
            })
        })
        .catch(function(err) {
            // reset search input
            $("#search-input").val("");

            // alert user that there was an error
            alert("We could not find the city you searched for. Try searching for a valid city.");
        });
};






            
// var getWeather = function(weather) {
//     var weather = "https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=standard";
//     console.log(weather)
// };
// getWeather();
