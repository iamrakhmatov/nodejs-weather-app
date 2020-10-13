const req = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4a22ee95388f72105dc37c23d4f5b7ea&query='+ encodeURIComponent(lat) + ',' + encodeURIComponent(long)
    req({ url: url, json: true}, (err, {body} = {}) => {
            if(err) {
                callback('Unable to connect to weather service!!!', undefined)
            } else if(body.error) {
                callback('Unable to get weather of this location. Try another search!!!', undefined)
            } else {
                callback(undefined, {
                    temperature: body.current.temperature,
                    description: body.current.weather_descriptions[0]
                })
            }
    })

} 


module.exports = forecast