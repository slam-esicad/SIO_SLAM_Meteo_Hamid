//$('.banner').hide()
import Element from "./Element.js";

let btn_search = document.querySelector('.submit')
let dark = document.querySelector('.dark-btnn')

async function weather(city, units) {
    let req = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=e2c95873f84c750dd9978fabe48cd75f&lang=fr&units=' + units + '')
    return await req.json()
}

btn_search.addEventListener('click', () => {
    $('.banner').show(1000)
    let city = document.querySelector('#city').value

    let units = document.getElementsByName('units')

    for (let i = 0; i < units.length; i++) {
        if(units[i].checked) {
            let city_temp = document.querySelector('.city_temp')
            console.log(units[i].value)
            let res = weather(city, units[i].value)
            //let unit = units[i].value
            //console.log(units[i].value)

            const promise1 = Promise.resolve(res);
            promise1.then((value) => {
                document.querySelector('.city_found').innerHTML = city
                document.querySelector('.city_temp').innerHTML = Math.trunc(value.main.temp)
                console.log(value)
                document.querySelector('.icon').src = "https://openweathermap.org/img/w/" + value.weather[0].icon + ".png"
                if(units[i].value === 'metric') {
                    document.querySelector('.city_units').innerHTML = "°C"
                    document.querySelector('.city_units').title = "Celcius"
                } else if(units[i].value === 'standard') {
                    document.querySelector('.city_units').innerHTML = "°K"
                    document.querySelector('.city_units').title = "Kelvin"
                } else if(units[i].value === 'imperial') {
                    document.querySelector('.city_units').innerHTML = "°F"
                    document.querySelector('.city_units').title = "Impérial"
                }
            });
        }
    }
})

dark.addEventListener('click', () => {
    let darkBtn = new Element('.dark-btnn').toDark('dark-btn')
    let divDarkBtn = new Element('.darkmode').toDark('dark-divbtn')
    let bg = new Element('.content').toDark('dark-bg')
    let text = new Element('body').toDark('dark-text')
    let banner = new Element('.banner').toDark('dark-banner')

})

let pos = (data) => {
    console.log(data.coords.latitude)
}

let error = (err) => {
    console.warn('Erreur : ' + err.message)
}

console.log(navigator.geolocation.getCurrentPosition(pos))