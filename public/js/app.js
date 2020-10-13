console.log('Client side javascript file is loaded')



const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

// messageOne.textContent = 'From js'

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Forecast is loading ...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then( response => {
        response.json().then( data => {
            if(data.error){
                // console.log('Error:', data.error)
                messageOne.textContent = data.error
            } else {
                // console.log(data.address)
                // console.log(data.forecast)
                messageOne.textContent = data.address
                messageTwo.textContent = 'Temperature in ' + data.address + ' is ' + data.forecast.temperature + ' and it is ' + data.forecast.description
            }
        })
    })
})