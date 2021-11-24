async function start() {
    const response = await fetch('https://api.thedogapi.com/v1/breeds?attach_breed=0')
    const data = await response.json()
    console.log(data)
}

start()