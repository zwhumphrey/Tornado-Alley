var apiKey = "16c08d72512cd292161652f7d9f82632";



var getWeather = function(weather) {
    var weather = "https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=standard";
    console.log(weather)
};
getWeather();
