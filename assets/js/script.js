var dogSectionEl = document.getElementById("dog-selection");
var dogImgContainerEl = document.getElementById("dog-img-container");
var dogImageEl = document.createElement("img");
var weatherSectionEl = document.getElementById("weather");

var submitCityEl = document.getElementById("submit-btn");
var cityInputValue = document.querySelector("#city");

var dogNames = [];
var nameArr = [];

var apiKey = "808721e2dc63debd30d894b4d377543b";
var cityName = "Orlando";
var weatherDescription  = "";
var dateToday;
var temp;
var wind;
var humidity;
var uvIndex;
var kelvin = 0;

// var fahrenheit = ((kelvin - 273.15) * (9/5) + 32);

// event.preventDefault();  may need this

// fetch("http://api.openweathermap.org/data/2.5/forecast?id=524901&appid="+ cityInputValue.value + apiKey).then(res => res.json())
// .then(data => console.log(data));

//THIS WORKS
//https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=808721e2dc63debd30d894b4d377543b

//api.openweathermap.org/data/2.5/weather?q=Orlando&appid=808721e2dc63debd30d894b4d377543b
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey).then(res => res.json())
.then(data => console.log(data));


//get id of search city button
//submitCityEl.addEventListener("click", getCityName);


async function start() {
    const response = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await response.json()


    createDogNames(data);
    dogNames = data;

    console.log(dogNames[0].temperament);

    //split dog temperament with "," to array
    nameArr = dogNames[0].temperament.split(', ');
    console.log(nameArr);


}


submitCityEl.addEventListener("click", function(){
    event.preventDefault();
    console.log(cityInputValue.value);
    cityName = cityInputValue.value;
    console.log(cityName);
    startWeather(cityName);
})

async function startWeather(cityName) {
    const responseWeather = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
    const dataWeather = await responseWeather.json()

    createWeather(dataWeather);
    // console.log(dataWeather);
    // kelvin = dataWeather.main.temp;
    // var fahrenheit = ((kelvin - 273.15) * (9/5) + 32);
    // var fTwoDigits = fahrenheit.toFixed(1);
    // console.log(fTwoDigits);
    
}




start();



function createDogNames(breedNames){
    for(var i = 0; i < breedNames.length; i++){// change to breedNames.lenght afterwards

        
        //console.log(breedNames[i].name);

        //create dog list
        var dogNameEl = document.createElement("option");

        //adds dog names to list
        dogNameEl.innerHTML = breedNames[i].name;
        //dogImageEl.innerHTML = breedNames[i].image.url;

        //give dog option an id
        dogNameEl.id = "dog-" + i;

        //dogImageEl.src = breedNames[i].image.url;

        //dogNameEl.setAttribute("value", breedNames[i].name);

        //append option to select elements in html
        dogSectionEl.appendChild(dogNameEl);
        dogImgContainerEl.appendChild(dogImageEl);

    }

}


//create weather
function createWeather(dataWeather){
    var tempEl = document.createElement("div");
    

    console.log(dataWeather);
    tempEl.innerHTML = "";

    weatherDescription = dataWeather.weather[0].description;
    console.log(weatherDescription);

    kelvin = dataWeather.main.temp;
    var fahrenheit = ((kelvin - 273.15) * (9/5) + 32);
    var fTwoDigits = fahrenheit.toFixed(1);

    //
    tempEl.class = "temp";
    tempEl.innerHTML = "Fahrenheit: " + fTwoDigits;

    weatherSectionEl.appendChild(tempEl);


    

}




dogSectionEl.addEventListener("change", function(){
    var selectValue = getValue("dog-selection");
    for(var i = 0; i < dogNames.length; i++){
        if(selectValue === dogNames[i].name){    
            dogImageEl.src = dogNames[i].image.url;
            console.log(dogNames[i]);
        }
    }
});




function getValue(id){
    return document.getElementById(id).value;
}

// function createDogImage(breedNames){

//     if

// }






































