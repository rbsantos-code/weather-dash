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

        // temperature 

        var tempEl = document.querySelector("#temp");
        tempEl.innerHTML = "Temp: " + data.main.temp + " degrees";

        // humidity 

        var humidityEl = document.querySelector("#humid");
        humidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";

        // Wind Speeds

        var windEl = document.querySelector("#wind");
        windEl.innerHTML = "Wind Speed: " + data.wind.speed + " mph";

       // UV Section

       var lon = data.coord.lon;
       var lat = data.coord.lat;
       
       var uvAPI = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

       fetch(uvAPI).then(response => response.json()).then(info => console.log(info));
       // add console log to see json from api

       fetch(uvAPI).then(response => response.json()).then(function(info) {

        var uvEl = document.querySelector("#uvRay");
        uvEl.innerHTML = "UV: " + info.value;
 
       })

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

// button section for search button
searchButtonEl.addEventListener("click", function() {
    var searchCity = searchInputEl.value;
    getWeather(searchCity);
    searchBookmark.push(searchCity);
    localStorage.setItem("search", JSON.stringify(searchBookmark));
    showSearchBookmarks();
})

// button section for refresh button
refreshButtonEl.addEventListener("click", function() {
    localStorage.clear();
    searchBookmark = [];
    showSearchBookmarks();
})