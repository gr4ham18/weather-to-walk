var dogSectionEl = document.getElementById("dog-selection");
console.log(dogSectionEl);

async function start() {
    const response = await fetch('https://api.thedogapi.com/v1/breeds')
    const data = await response.json()
    //console.log(data[0].name)
    createDogNames(data);
}

start()


function createDogNames(breedNames){
    for(var i = 0; i < 1; i++){// change to breedNames.lenght afterwards

        //console.log(breedNames[i].name);




        //create dog list
        var dogNameEl = document.createElement("option")

        //adds dog names to list
        dogNameEl.innerHTML = breedNames[i].name;

        //append option to select elements in html
        dogSectionEl.appendChild(dogNameEl);

    }

}
