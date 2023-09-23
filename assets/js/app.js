//$('.banner').hide()
import Element from "./Element.js";
import Geolocalisation from "./Geolocalisation.js";

let btn_search = document.querySelector('.submit')
let dark = document.querySelector('.dark-btnn')
let radio = document.querySelector('.units')

async function weather(city, units) {
    let req = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=e2c95873f84c750dd9978fabe48cd75f&lang=fr&units=' + units + '')
    return await req.json()
}

let pos = (data) => {

    let rada = document.getElementsByName('units')
    for (let i = 0; i < rada.length; i++) {
        if(rada[i].checked) {

            let dataLoca = new Geolocalisation(data.coords.latitude, data.coords.longitude, rada[i].value).getInfos()

            //let dataLoca = Geoloca.getInfos()
            //let dataLoca = weatherLoca(data.coords.latitude, data.coords.longitude, "metric")

            const promise1 = Promise.resolve(dataLoca)
            .then((value) => {
                document.querySelector('#city').value = value.name
                document.querySelector('.city_found').innerHTML = value.name
                console.log(value.main.temp)
                document.querySelector('.city_temp').innerHTML = Math.trunc(value.main.temp)
                document.querySelector('.icon').src = "https://openweathermap.org/img/w/" + value.weather[0].icon + ".png"
            })
        }
    }

}

document.querySelector('.loca').addEventListener('click', () => {
    console.log(navigator.geolocation.getCurrentPosition(pos))
})

function up(res, varUnit) {
    const promise1 = Promise.resolve(res);
    promise1.then((value) => {
        document.querySelector('.city_found').innerHTML = document.querySelector('#city').value
        document.querySelector('.city_temp').innerHTML = Math.trunc(value.main.temp)
        document.querySelector('.icon').src = "https://openweathermap.org/img/w/" + value.weather[0].icon + ".png"
        if(varUnit.value === 'metric') {
            document.querySelector('.city_units').innerHTML = "°C"
            document.querySelector('.city_units').title = "Celcius"
        } else if(varUnit.value === 'standard') {
            document.querySelector('.city_units').innerHTML = "°K"
            document.querySelector('.city_units').title = "Kelvin"
        } else if(varUnit.value === 'imperial') {
            document.querySelector('.city_units').innerHTML = "°F"
            document.querySelector('.city_units').title = "Impérial"
        }
    });
}

btn_search.addEventListener('click', () => {

    let city = document.querySelector('#city').value
    let units = document.getElementsByName('units')

    for (let i = 0; i < units.length; i++) {
        if(units[i].checked) {
            let city_temp = document.querySelector('.city_temp')
            console.log(units[i].value)
            let res = weather(city, units[i].value)

            up(res, units[i])
        }
    }
})

let res
let rad = document.getElementsByName('units')
for (let x = 0; x < rad.length; x++) {
    rad[x].addEventListener('change', function() {
        console.log(rad[x])
        res = weather(document.querySelector('#city').value, rad[x].value)
        document.querySelector('.city_found').innerHTML = document.querySelector('#city').value
        up(res, rad[x])
    });
}


dark.addEventListener('click', () => {
    let darkBtn = new Element('.dark-btnn').toDark('dark-btn')
    let divDarkBtn = new Element('.darkmode').toDark('dark-divbtn')
    let bg = new Element('.content').toDark('dark-bg')
    let text = new Element('body').toDark('dark-text')
    let banner = new Element('.banner').toDark('dark-banner')

})

