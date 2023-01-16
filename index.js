const clientId = "m6DvXYMK6CTwN13XidkB2GMc0YIgxv31Pzso4k6xzYw"
const appId = "d771992cc2392869ed7cd876cea0c445"

// UNSPLASH API - BACKGROUND IMAGES
fetch(`https://api.unsplash.com/photos/random/?client_id=${clientId}&orientation=landscape&query=art`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.raw})`

		document.getElementById("author").textContent = `Photo by: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1477973770766-6228305816df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzk2NTR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTU3NTM5NTQ&ixlib=rb-1.2.1&q=80&w=1080)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })


// GO QUOTES API - RANDOM QUOTES
fetch("https://programming-quotes-api.herokuapp.com/Quotes/random")
    .then(res => res.json())
    .then(data => {
        document.getElementById("quote").textContent = `${data.en}`
    })



// CURRENT TIME
function getCurrentTime() {
    
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)


// OPEN WEATHER API - GET WEATHER WITH GEOLOCATION API
navigator.geolocation.getCurrentPosition(position => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${appId}`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <div class="icon-temp">
                    <img src=${iconUrl}>
                    <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                </div>
                <p class="weather-city">${data.name}</p>
                
            `
        })
        .catch(err => console.error(err))
});
