export default class Geolocalisation {

    constructor(lat, lon, unit) {
        this.lat = lat
        this.lon = lon
        this.unit = unit
    }

    async getInfos() {
        let req = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+this.lat+"&lon="+this.lon+"&appid=e2c95873f84c750dd9978fabe48cd75f&lang=fr&units=" + this.unit + "")
        return await req.json()
    }

}