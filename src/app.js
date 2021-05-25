const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rohit Agrawal'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rohit Agrawal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Rohit Agrawal'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide the address!"
        });
    }

    geocode(req.query.address, (error, data ={}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                });
            }
            console.log(forecastData)
            res.send({
                location: data.location,
                weather: forecastData,
                NOTE: data.NOTE
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rohit Agrawal',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rohit Agrawal',
        errorMessage: 'Page not found.'
    })
})

const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Listening on port ${port}...`);
});