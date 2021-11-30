//variables/javascript elements
var dogSectionEl = document.getElementById("dog-selection");
var dogImgContainerEl = document.getElementById("dog-img-container");
var dogImageEl = document.createElement("img");
var weatherSectionEl = document.getElementById("weather");
var submitCityEl = document.getElementById("submit-btn");
var cityInputValue = document.querySelector("#city");
var localCityName = document.getElementsByClassName("form-input");


var dogNames = [];
var nameArr = [];
var dogSelected = "dog";

var apiKey = "808721e2dc63debd30d894b4d377543b";
var cityName = "Orlando";
var weatherDescription = "";
//var dogTemperament = [];
var weatherIcon;
var dateToday;
var temp;
var wind;
var humidity;
var uvIndex;
var kelvin = 0;

//api.openweathermap.org/data/2.5/weather?q=Orlando&appid=808721e2dc63debd30d894b4d377543b
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey).then(res => res.json())
    .then(data => console.log(data));

//async function to fetch the dog api
async function start() {
    const response = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await response.json()

    createDogNames(data);
    dogNames = data;
    console.log(dogNames);

    // for(i=0; i<dogNames.length ; i++){
    //     var dogTemperament = dogNames[i].temperament;
    //     console.log(dogTemperament);

    //     var dogArr = dogTemperament.split(',');
    //     console.log(dogArr);
    // }

    console.log(dogNames[0].temperament);

    //split dog temperament with "," to array
    nameArr = dogNames[0].temperament.split(', ');
    console.log(nameArr);


}

//event listener on the search city button in index.html
submitCityEl.addEventListener("click", function () {
    event.preventDefault();
    console.log(cityInputValue.value);
    cityName = cityInputValue.value;

    //store local storage
    localStorage.setItem("cityName", cityName);


    startWeather(cityName);
})

//async function to fetch the openweather api
async function startWeather(cityName) {
    //adds cityName and apiKey to the fetch url
    const responseWeather = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
    const dataWeather = await responseWeather.json()

    createWeather(dataWeather);

}

//loadCityName(cityName);
start();
var savedCity = localStorage.getItem("cityName")
startWeather(savedCity);

function createDogNames(breedNames) {
    for (var i = 0; i < breedNames.length; i++) {// change to breedNames.lenght afterwards

        //create dog list
        var dogNameEl = document.createElement("option");

        //adds dog names to list
        dogNameEl.innerHTML = breedNames[i].name;

        //give ids
        dogNameEl.id = "dog-" + i;

        //add class.Names
        //dogNameEl.className = 

        //append option to select elements in html
        dogSectionEl.appendChild(dogNameEl);
        dogImgContainerEl.appendChild(dogImageEl);

    }

}

//create weather
function createWeather(dataWeather) {

    //empty the containing div
    weatherSectionEl.innerHTML = '';

    //create elements
    var tempEl = document.createElement("div");
    var temperatureEl = document.createElement("p");
    var descriptionEl = document.createElement("p");
    var goodWeatherEl = document.createElement("h3");
    var iconEl = document.createElement("img");
    var locationEl = document.createElement("h2");

    console.log(dataWeather);

    //weatherDescription
    weatherDescription = dataWeather.weather[0].description;
    console.log(weatherDescription);

    //store weatherIcon
    weatherIcon = dataWeather.weather[0].icon;
    console.log(weatherIcon);

    //able to add icons
    iconEl.src = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    //do math to covert to farenheit
    kelvin = dataWeather.main.temp;
    var fahrenheit = ((kelvin - 273.15) * (9 / 5) + 32);
    var fTwoDigits = fahrenheit.toFixed(1);

    //add class name
    temperatureEl.className = "temp";
    descriptionEl.className = "description";

    //add text
    locationEl.innerHTML = dataWeather.name;
    temperatureEl.innerHTML = "Fahrenheit: " + fTwoDigits;
    descriptionEl.innerHTML = "Today we have " + weatherDescription;


    //add the p element to the empty div
    tempEl.appendChild(locationEl);
    tempEl.appendChild(descriptionEl);
    tempEl.appendChild(iconEl);
    tempEl.appendChild(temperatureEl);


    if (fTwoDigits >= 85) {
        if (weatherDescription === "clear sky" || weatherDescription === "few clouds" || weatherDescription === "scattered clouds" || weatherDescription === "broken clouds"){
            goodWeatherEl.innerHTML = "Go take a short walk and bring some water for you and your " + dogSelected +"!";
            tempEl.appendChild(goodWeatherEl);
        }
    } else if (weatherDescription === "clear sky" || weatherDescription === "few clouds" || weatherDescription === "scattered clouds" || weatherDescription === "broken clouds") {
        goodWeatherEl.innerHTML = "Go take your " + dogSelected + " for a walk";
        tempEl.appendChild(goodWeatherEl);
    } else if (fTwoDigits <= 45) {
        goodWeatherEl.innerHTML = "Make sure to bring a jacket for you and your " + dogSelected +".";
        tempEl.appendChild(goodWeatherEl);
    } else {
        goodWeatherEl.innerHTML = "Maybe play inside with your " + dogSelected + ".";
        tempEl.appendChild(goodWeatherEl);
    }

    //add empty div to div with id of weather
    weatherSectionEl.appendChild(tempEl);


}

//event listern for change on the drop down list
dogSectionEl.addEventListener("change", function () {
    var selectValue = getValue("dog-selection");
    for (var i = 0; i < dogNames.length; i++) {
        if (selectValue === dogNames[i].name) {

            //empty contaner before next dog
            dogImgContainerEl.innerHTML = '';

            dogImageEl.src = dogNames[i].image.url;
            console.log(dogNames[i]);

            // Stores Selected Dog Local
            dogSelected = dogNames[i].name
            localStorage.setItem("dogSelected", dogSelected);


            //create element
            var dogBreedEl = document.createElement("p");
            var dogTemperamentEl = document.createElement("p");

            //create text
            dogBreedEl.innerHTML = "Breed: " + dogNames[i].name;
            // dogOriginEl.innerHTML = "Breed Origin: " + dogNames[i].origin;
            dogTemperamentEl.innerHTML = "Average Temperament: " + dogNames[i].temperament;

            //checks if origin is unknown or undefined
            // if(dogOriginEl.innerHTML === "" || dogOriginEl.innerHTML === "undefined"){
            //     dogOriginEl.innerHTML = "The dog origin is unknown";
            // }

            //append elements to container
            dogImgContainerEl.appendChild(dogImageEl);//we forgot to append this but it works now
            dogImgContainerEl.appendChild(dogBreedEl);
            // dogImgContainerEl.appendChild(dogOriginEl);
            dogImgContainerEl.appendChild(dogTemperamentEl);


        }
    }
});


function getValue(id) {
    return document.getElementById(id).value;
}

            //dont think we need this, but keep for now
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('select');
//     var instances = M.FormSelect.init(elems, options);
// });