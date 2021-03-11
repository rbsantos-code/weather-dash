var cityNameEl = document.querySelector("#city-name");
var searchInputEl = document.querySelector(".search-city");
var searchButtonEl = document.querySelector("#search-button");
var refreshButtonEl = document.querySelector("#refresh-button");
var bookmarksEl = document.querySelector("#bookmark");
var searchBookmark = JSON.parse(localStorage.getItem("search")) || [];
var cityName = [];
var cardContentEl = document.querySelector(".card-content");

const apiKey = "0407705a6c8b13b72c72ab44889502ee";

function getWeather(city) {

    let weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    // data and day function
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var dateInfo = " (" + month + "/" + day + "/" + year + ") ";

    fetch(weatherAPI).then(response => response.json()).then(data => console.log(data));
    // Add console log to see json from api

    fetch(weatherAPI).then(response => response.json()).then(function(data) {
        
        // weather card section
        cityNameEl.innerHTML = data.name + dateInfo

        // Icon Section
        let iconURL = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

        var weatherImgEl = document.querySelector(".weatherImg");
        var weatherIconEl = document.querySelector("#weatherIcon");

        weatherIconEl.innerHTML = "";
        weatherIconEl.innerHTML = data.weather[0].icon;
        weatherIconEl.setAttribute("src", iconURL);
        console.log(weatherImgEl);


        // temperature 

        var tempEl = document.querySelector("#temp");
        tempEl.innerHTML = "Temp: " + data.main.temp + " degrees";

        // humidity 

        var humidityEl = document.querySelector("#humid");
        humidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";

        // Wind Speeds

        var windEl = document.querySelector("#wind");
        windEl.innerHTML = "Wind Speed: " + data.wind.speed + " mph";

       // UV Section------

       var lon = data.coord.lon;
       var lat = data.coord.lat;
       
       var uvAPI = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

       fetch(uvAPI).then(response => response.json()).then(info => console.log(info));
       // add console log to see json from api

       fetch(uvAPI).then(response => response.json()).then(function(info) {

        var uvEl = document.querySelector("#uvRay");
        uvEl.innerHTML = "UV: " + info.value;
 
       })

       // 5 day Forecase Section------

       let fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

       fetch(fiveDay).then(response => response.json()).then(weather => console.log(weather));
       // console log to see json from api

       fetch(fiveDay).then(response => response.json()).then(function(weather) {

            var forecastEl = document.querySelectorAll(".forecast");
            for ( var i = 0; i < forecastEl.length; i++) {
                var forecastIndex = i * 8 + 4;
                forecastEl[i].innerHTML = "";

                // 5 Day Dates
                
                var fiveDayDate = new Date(weather.list[forecastIndex].dt * 1000);
                console.log(fiveDayDate);
                var fiveDay = fiveDayDate.getDate();
                var fiveMonth = fiveDayDate.getMonth();
                var fiveYear = fiveDayDate.getFullYear();

                var dateData = " (" + fiveDay + "/" + fiveMonth + "/" + fiveYear + ") ";
                
                var fiveDates = document.createElement('p');
                fiveDates.innerHTML = dateData;
                forecastEl[i].append(fiveDates);
            
            }
       });

    });


};


// Search and Bookmark section
function showSearchBookmarks() {
    bookmarksEl.innerHTML = "";
    for (var i = 0; i < searchBookmark.length; i++) {
        var bookmarkInput = document.createElement("input");
        bookmarkInput.setAttribute("type", "text");
        bookmarkInput.setAttribute("class", "form-control d-block bg-white");
        bookmarkInput.setAttribute("value", searchBookmark[i]);
        bookmarkInput.addEventListener("click", function() {
            getWeather(bookmarkInput.value);
        })
        bookmarksEl.append(bookmarkInput);
    }
}

// Search input/button section to search city name
searchButtonEl.addEventListener("click", function() {
    var searchCity = searchInputEl.value;
    getWeather(searchCity);
    searchBookmark.push(searchCity);
    localStorage.setItem("search", JSON.stringify(searchBookmark));
    showSearchBookmarks();
})

// refesh button section
refreshButtonEl.addEventListener("click", function() {
    localStorage.clear();
    searchBookmark = [];
    showSearchBookmarks();
})