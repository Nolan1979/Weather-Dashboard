var currentWeather = $("#currentWeather");
var fiveCast = $("#five-card-group");
var cityHistory = $("#city-history");
let apiKey = "103fe697574e9a9d8b8b7b6b17981905";
let currentTemp = document.querySelector('.currentTemp');




$(".searchBtn").on('click', function () {
    getCurrentWeather();

});




function getCurrentWeather() {
    let cityInput = document.querySelector('.text').value;

    var cityHistoryList = $('input[id="cityName"]').val();
    cityHistory.append('<li>' + cityHistoryList + '</li>')
    
    

    let requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=103fe697574e9a9d8b8b7b6b17981905&units=imperial"


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var cardBody = $("<div>").addClass('cardBody');
            var cityName = $("<h3>").addClass("cityName");
            cityName.text(data.name);

            var tempEl = $("<p>");
            tempEl.text("Current Temperature: " + data.main.temp)

            var humidEl = $("<p>");
            humidEl.text("Humidity: " + data.main.humidity)

            var windEl = $("<p>");
            windEl.text("Wind Speed: " + data.wind.speed)


            cardBody.append(cityName, tempEl, humidEl, windEl);
            currentWeather.append(cardBody)


            getUvIndex(data.coord.lat, data.coord.lon);
            getFiveDay(data.name)

        });
}


function getUvIndex(lat, lon) {
    var urlUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=103fe697574e9a9d8b8b7b6b17981905&lat=" + lat + "&lon=" + lon;

    fetch(urlUV).then(function (response) {
        return response.json()
    }).then(function (data) {


        var uviEl = $("<p>");
        uviEl.text("UV Index: " + data.value);
        $(".cardBody").append(uviEl)
    })
};


function getFiveDay(title) {
    const fiveUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + title + "&exclude=hourly,minutely&appid=103fe697574e9a9d8b8b7b6b17981905&units=imperial";

    fetch(fiveUrl)
        .then(function (response) {
            return response.json()
        }).then(function (data) {


            var forecastArray = data.list



            for (let i = 0; i < forecastArray.length; i++) {

                if (forecastArray[i].dt_txt.indexOf("00:00:00") !== -1) {
                    console.log(forecastArray[i])

                    const data = forecastArray[i]

                    var dateFormat = new Date(data.dt * 1000).toLocaleDateString("en-US")
                    console.log(dateFormat)


                    const fiveCardBody = $("<div>").addClass('five-day-card-body');

                    const dateName = $("<h3>").addClass("dateName");
                    dateName.text(data.dt_txt = dateFormat);


                    const fiveTempEl = $("<p>");
                    fiveTempEl.text("Temperature: " + data.main.temp);


                    const fiveHumidEl = $("<p>");
                    fiveHumidEl.text("Humidity: " + data.main.humidity);


                    const fiveWindEl = $("<p>");
                    fiveWindEl.text("Wind Speed: " + data.wind.speed + " mph");



                    fiveCardBody.append(dateName, fiveTempEl, fiveHumidEl, fiveWindEl);
                    fiveCast.append(fiveCardBody)


                }



            }
        })

}



























