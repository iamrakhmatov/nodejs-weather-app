const req = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaWFtcmFraG1hdG92IiwiYSI6ImNrZzRwY2YzMjAzZzcyc3IwcmIwOXJsaWMifQ.hWm_1G9sjHcSL-BxaSzAjQ&limit=1' 

    req({ url: url, json: true}, (err, {body} = {}) => {
        if(err){
            callback('Unable to connect to geolocation services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
                city: body.features[0].context[0].text
            })
        }
    })
}

module.exports = geoCode