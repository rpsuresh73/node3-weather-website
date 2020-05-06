const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()


const publicDirectoryPath = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsDir)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',
           {
               title: 'Weather',
               name: 'Suresh',
               location: 'Greystanes'
           })
})
 app.get('/about', (req, res) => {
    res.render('about',
           {
               title: 'About',
               name: 'Suresh',
               location: 'Greystanes'
           })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
      return res.send({
          error: 'You have to provide an address'
      })
  }
  geocode.geoCode(req.query.address, (error, {latitude, longitude} ={} ) => {
      if (error) {
          return res.send({
              error: error
          })
      }
      else {
       forecast(longitude, latitude, (error, {description, temperature, chance_of_rain, location} ={}) => {
           if (error){
               return res.send({
                   error: error
               })
            }
            else {
                return res.send({
                    description: description,
                    temperature: temperature,
                    chance_of_rain: chance_of_rain,
                    location: location
                })
            }
       })
    }
  })
})


app.get('/help', (req, res) => {
    res.render('help',
           {
               title: 'Help',
               name: 'Suresh',
               location: 'Greystanes'
           })
})

app.get('/help/*', (req, res) => {
     res.render('404-page', {
         title: 'Help',
         error: 'Help document not available',
         name: 'Suresh',
         location: 'Greystanes'
     })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        error: 'Page Not Found',
        name: 'Suresh',
        location: 'Greystanes'
    })
})

    app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
