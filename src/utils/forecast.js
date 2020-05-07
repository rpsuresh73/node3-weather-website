const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=06168b184a0c2f8c45f52269927d21e9&query=' + latitude + ',' + longitude + '&units=f'
      request({url, json: true}, (error, {body}) => {
       if (error) {
           callback('Unable to connect to weather services', undefined)
       } else if (body.error) {
          callback('Unable to find weather for location', undefined)
       } else {
           callback(undefined, {
               description: body.current.weather_descriptions[0],
               temperature: body.current.temperature,
               chance_of_rain: + body.current.precip , 
               location: body.location.name,  
               humidity: body.current.weather_descriptions.humidity        
           })
       }
    })
  }
  
module.exports = forecast