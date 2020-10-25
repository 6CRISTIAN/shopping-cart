const { config } = require('./config/config')
const express = require('express')
const Products = require('./routes/products')

const app = express()

app.use(express.static('views'))
app.use('/*', express.static(__dirname + '/node_modules/'))

new Products(app)

app.listen(config.port, '127.0.0.1', () => {
    console.log(`listening http://127.0.0.1:${config.port}`)
})

module.exports = app