const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to YelpCamp!!!')
})

app.listen(3456, () => {
    console.log('Serving on port 3456')
    console.log('http://localhost:3456/')
})