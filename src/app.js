const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geolocation')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


// Paths 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shakhruz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shakhruz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Shakhruz Rakhmatov',
        text: 'Here you can find useful articles!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address query!'
        })
    }
    
    geoCode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err){
            return res.send({
                error: 'Unable to find location. Try another search'
            })
        }
        
        forecast(longitude, latitude, (err, forecastData) => {
            if(err){
                return res.send(err)
            }
            res.send({
                address: location,
                forecast: forecastData
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help articel not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found'
    })
})




//  Listen on port
app.listen(port, () =>{
    console.log('Server is up on the ' + port)
})




