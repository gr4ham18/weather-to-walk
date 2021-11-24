var dogSectionEl = document.getElementById("dog-selection");
var dogImgContainerEl = document.getElementById("dog-img-container");


async function start() {
    const response = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await response.json()
    console.log(data);
    console.log(data[0].image);
    createDogNames(data);

}

start()


function createDogNames(breedNames){
    for(var i = 0; i < 2; i++){// change to breedNames.lenght afterwards

        //console.log(breedNames[i].name);

        //create dog list
        dogNameEl = document.createElement("option")
        dogImageEl = document.createElement("img")
 
        //adds dog names to list
        dogNameEl.innerHTML = breedNames[i].name;
        //dogImageEl.innerHTML = breedNames[i].image.url;

        //give dog option an id
        dogNameEl.id = "dog-" + i;
        dogImageEl.src = breedNames[i].image.url;

        //append option to select elements in html
        dogSectionEl.appendChild(dogNameEl);
        dogImgContainerEl.appendChild(dogImageEl);

    }

}

// function createDogImage(breedNames){

//     if

// }
