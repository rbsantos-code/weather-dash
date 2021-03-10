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

    fetch(weatherAPI).then(function(response) {
        
        // weather card section
        cityNameEl.innerHTML = response.sys.name + dateInfo
        // temperature 
        var temp = parseInt((response.main.temp)* 9/5 - 459);
        var cityTemp = $("<p>").text("Temp: " + temp + " Fahrenheit");
        $("#temp").append(cityTemp);
        // humidity 
        var cityHumid = $("<p>").text("Humdity: " + response.main.humidty + " %");
        $("#humid").append(cityHumid);
        // Wind Speeds
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " mph");
        $("#wind-speed").append(windSpeed);
        
        return response.json();
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