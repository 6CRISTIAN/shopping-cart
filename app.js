const config = require('./config/config')
const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('public'))
app.use('/*', express.static(__dirname + '/node_modules/'))

app.listen(config.port, '127.0.0.1', () => {
    console.log(`listening http://127.0.0.1:${config.port}`)
})

module.exports = app
