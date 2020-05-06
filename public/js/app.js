console.log('SS Script loaded...')

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         }
//         else {
//             console.log(data.description)
//             console.log(data.temperature)
//             console.log(data.chance_of_rain)
//             console.log(data.location)
        
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
     e.preventDefault()
      searchURL = 'http://localhost:3000/weather?address=' +  search.value
      messageTwo.textContent = 'Loading...'
      messageOne.textContent = ''

      fetch(searchURL).then((response) => {
     response.json().then((data) => {
         if (data.error) {
             //console.log(data.error)
             messageTwo.textContent = data.error
             messageOne.textContent = ''
         }
         else {
             messageOne.textContent = 'In '+ data.location + ', it is '+ data.description + '. Current temperature is ' + data.temperature + '. There is ' + data.chance_of_rain + '% of rain'
             messageTwo.textContent = ' '
             // console.log(data.description)
            //  console.log(data.temperature)
            //  console.log(data.chance_of_rain)
            //  console.log(data.location)
        
         }
     })
 })

})