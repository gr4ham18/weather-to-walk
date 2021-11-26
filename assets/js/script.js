var dogSectionEl = document.getElementById("dog-selection");
var dogImgContainerEl = document.getElementById("dog-img-container");
var dogImageEl = document.createElement("img");

var submitCityEl = document.getElementById("submit-btn");

var dogNames = [];
var nameArr = [];

var apiKey = "808721e2dc63debd30d894b4d377543b";
var cityName;
var dateToday;
var temp;
var wind;
var humidity;
var uvIndex;


fetch("http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + apiKey).then(res => res.json())
.then(data => console.log(data));

//get id of search city button
submitCityEl.addEventListener("click", getCityName);


function getCityName(event){
    console.log(event);   
}

async function start() {
    const response = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await response.json()
    console.log(data);
    console.log(data[0].image);
    createDogNames(data);
    dogNames = data;

    console.log(dogNames[0].temperament);

    //split dog temperament with "," to array
    nameArr = dogNames[0].temperament.split(', ');
    console.log(nameArr);


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






































