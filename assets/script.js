var apiKey = "16c08d72512cd292161652f7d9f82632";
var savedSearches = [];

// searched cities
var searchHistoryList = function(cityName) {
    $('.past-search:contains("' + cityName + '")').remove();

    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    searchHistoryEntry.text(cityName);

    var searchEntryContainer = $("<div>");
    searchEntryContainer.addClass("past-search-container");
    searchEntryContainer.append(searchHistoryEntry);

    var searchHistoryContainerEl = $("#search-history");
    searchHistoryContainerEl.append(searchEntryContainer);

    if (savedSearches.length > 0){
        var previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }
    savedSearches.push(cityName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

    $("#search-input").val("")
};

var loadSearchHistory = function() {
    var savedSearchHistory = localStorage.getItem("savedSearches");

    if (!savedSearchHistory) {
        return false;
    }
    savedSearchHistory = JSON.parse(savedSearchHistory);
    for (var i = 0; i < savedSearchHistory.length; i++) {
        searchHistoryList(savedSearchHistory[i]);
    }
};

loadSearchHistory ();

var currentWeatherSection = function(cityName) {
    fetch("https://api.openweathermap.org/data/3.0/weather?q=${cityName}&appid=${apiKey}")
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

    fetch("https://api.openweathermap.org/data/3.0/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}")
        .then(function(response) {
            return response.json();
        })
        .then(function(response){
            searchHistoryList(cityName);

        var currentWeatherContainer = $("#current-weather");
        currentWeatherContainer.addClass("current-weather");


        var currentTitle = $("#current-title");
        var currentDay = moment().format("M/D/YYYY");
        currentTitle.text("${cityName} (${currentDay})");
        var currentIcon = $("#current-weather-icon");
        currentIcon.addClass("current-weather-icon");
        var currentIconCode = response.current.weather[0].icon;
        currentIcon.attr("src", "https://openweathermap.org/img/wn/${currentIconCode}@2x.png");

        // add current temperature to page
        var currentTemperature = $("#current-temp");
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
